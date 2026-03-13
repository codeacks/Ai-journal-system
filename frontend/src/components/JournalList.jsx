import React, { useState } from 'react';
import { Sparkles, Calendar, Tag, Info } from 'lucide-react';

const JournalList = ({ entries, onEntryUpdated }) => {
    const [analyzingId, setAnalyzingId] = useState(null);

    const handleAnalyze = async (entry) => {
        setAnalyzingId(entry._id);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/journal/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text: entry.text,
                    entryId: entry._id
                })
            });

            if (response.ok) {
                const analysis = await response.json();
                onEntryUpdated({ ...entry, ...analysis });
            } else {
                alert('Analysis failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to analysis service');
        } finally {
            setAnalyzingId(null);
        }
    };

    return (
        <section>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar size={20} color="var(--accent-color)" />
                Journal History
            </h2>
            {entries.length === 0 ? (
                <div className="premium-card glass" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Your memory collection is empty.</p>
                    <p style={{ fontSize: '0.9rem' }}>Reflect on your first session to see it here.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {entries.map((entry) => (
                        <div key={entry._id} className="premium-card glass">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-start' }}>
                                <div>
                                    <span className="badge" style={{ background: 'var(--accent-color)', color: 'white', marginRight: '0.75rem' }}>
                                        {entry.ambience}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        {new Date(entry.createdAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                    {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>{entry.text}</p>
                            
                            {entry.emotion ? (
                                <div style={{ 
                                    padding: '1rem', 
                                    backgroundColor: 'rgba(99, 102, 241, 0.05)', 
                                    borderRadius: '12px',
                                    border: '1px solid rgba(99, 102, 241, 0.1)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            padding: '4px', 
                                            borderRadius: '6px', 
                                            background: '#f43f5e', 
                                            width: '8px', height: '8px' 
                                        }}></div>
                                        <strong style={{ fontSize: '0.9rem', textTransform: 'capitalize' }}>{entry.emotion}</strong>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                                        "{entry.summary}"
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        { (Array.isArray(entry.keywords) ? entry.keywords : JSON.parse(entry.keywords)).map((kw, i) => (
                                            <span key={i} style={{ 
                                                fontSize: '0.7rem', 
                                                background: 'var(--border-color)', 
                                                padding: '2px 8px', 
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Tag size={10} /> {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => handleAnalyze(entry)}
                                    disabled={analyzingId === entry._id}
                                    className="btn-primary"
                                    style={{ width: 'fit-content', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                >
                                    <Sparkles size={16} />
                                    {analyzingId === entry._id ? 'Analyzing...' : 'AI Insights'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )
}
        </section>
    );
};

export default JournalList;
