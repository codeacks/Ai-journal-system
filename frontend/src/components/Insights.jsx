import React from 'react';
import { Activity, BarChart3, TrendingUp, Hash } from 'lucide-react';

const Insights = ({ insights }) => {
    if (!insights || insights.totalEntries === 0) return null;

    return (
        <section className="premium-card glass" style={{ color: 'var(--text-primary)' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                <Activity size={20} color="var(--accent-color)" />
                Mental Overview
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <BarChart3 size={18} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.9rem' }}>Total Reflections</span>
                    </div>
                    <strong style={{ fontSize: '1.1rem' }}>{insights.totalEntries}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <TrendingUp size={18} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.9rem' }}>Dominant Tone</span>
                    </div>
                    <span className="badge" style={{ background: 'var(--success-color)', color: 'white', textTransform: 'capitalize' }}>
                        {insights.topEmotion}
                    </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Activity size={18} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.9rem' }}>Favorite Space</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'capitalize' }}>{insights.mostUsedAmbience}</span>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <Hash size={18} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.9rem' }}>Core Themes</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {insights.recentKeywords.map((kw, i) => (
                            <span 
                                key={i} 
                                style={{ 
                                    backgroundColor: 'var(--bg-color)', 
                                    border: '1px solid var(--border-color)',
                                    padding: '4px 10px', 
                                    borderRadius: '8px', 
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)'
                                }}
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Insights;
