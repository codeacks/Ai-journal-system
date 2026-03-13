import React, { useState } from 'react';
import { Send, Leaf, Waves, Mountain, CloudRain } from 'lucide-react';

const JournalForm = ({ onEntryAdded }) => {
    const [text, setText] = useState('');
    const [ambience, setAmbience] = useState('forest');
    const [loading, setLoading] = useState(false);

    const ambienceIcons = {
        forest: <Leaf size={18} />,
        ocean: <Waves size={18} />,
        mountain: <Mountain size={18} />,
        rain: <CloudRain size={18} />
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/journal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: '123', ambience, text })
            });

            if (response.ok) {
                const newEntry = await response.json();
                onEntryAdded(newEntry);
                setText('');
            } else {
                alert('Failed to save entry');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to backend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="premium-card glass" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: 'var(--accent-color)', borderRadius: '10px', color: 'white' }}>
                    <Send size={20} />
                </div>
                Write Your Reflection
            </h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Choose your session ambience
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem' }}>
                        {Object.keys(ambienceIcons).map((key) => (
                            <div 
                                key={key}
                                onClick={() => setAmbience(key)}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '12px',
                                    border: `2px solid ${ambience === key ? 'var(--accent-color)' : 'var(--border-color)'}`,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: ambience === key ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span style={{ color: ambience === key ? 'var(--accent-color)' : 'var(--text-secondary)' }}>
                                    {ambienceIcons[key]}
                                </span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {key}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Mental Reflection
                    </label>
                    <textarea 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What were you feeling during the session? How did the environment impact you?"
                        rows="5"
                        style={{ resize: 'vertical' }}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                    style={{ width: '100%', py: '1rem' }}
                >
                    {loading ? 'Submitting...' : 'Save Reflections'}
                </button>
            </form>
        </section>
    );
};

export default JournalForm;
