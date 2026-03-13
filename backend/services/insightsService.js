function generateInsights(entries) {
    if (!entries || entries.length === 0) {
        return {
            totalEntries: 0,
            topEmotion: "none",
            mostUsedAmbience: "none",
            recentKeywords: []
        };
    }

    const totalEntries = entries.length;
    const emotionCount = {};
    const ambienceCount = {};
    const keywordCount = {};

    entries.forEach(entry => {
        // Count emotions
        if (entry.emotion) {
            emotionCount[entry.emotion] = (emotionCount[entry.emotion] || 0) + 1;
        }

        // Count ambience
        if (entry.ambience) {
            ambienceCount[entry.ambience] = (ambienceCount[entry.ambience] || 0) + 1;
        }

        // Count keywords
        if (entry.keywords) {
            try {
                const keywords = typeof entry.keywords === 'string' ? JSON.parse(entry.keywords) : entry.keywords;
                keywords.forEach(keyword => {
                    keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
                });
            } catch (e) {
                console.error("Error parsing keywords for entry", entry.id);
            }
        }
    });

    const getTop = (obj) => {
        const keys = Object.keys(obj);
        if (keys.length === 0) return "none";
        return keys.reduce((a, b) => obj[a] > obj[b] ? a : b);
    };

    const topEmotion = getTop(emotionCount);
    const mostUsedAmbience = getTop(ambienceCount);

    const recentKeywords = Object.keys(keywordCount)
        .sort((a, b) => keywordCount[b] - keywordCount[a])
        .slice(0, 5);

    return {
        totalEntries,
        topEmotion,
        mostUsedAmbience,
        recentKeywords
    };
}

export { generateInsights };
