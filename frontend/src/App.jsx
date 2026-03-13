import { useState, useEffect } from 'react';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import Insights from './components/Insights';
import ThemeToggle from './components/ThemeToggle';
import { BrainCircuit, Info } from 'lucide-react';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const userId = '123';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const [entriesRes, insightsRes] = await Promise.all([
        fetch(`${apiUrl}/api/journal/${userId}`),
        fetch(`${apiUrl}/api/journal/insights/${userId}`)
      ]);

      if (entriesRes.ok) {
        setEntries(await entriesRes.json());
      }
      if (insightsRes.ok) {
        setInsights(await insightsRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEntryAdded = (newEntry) => {
    setEntries([newEntry, ...entries]);
    fetchData();
  };

  const handleEntryUpdated = (updatedEntry) => {
    setEntries(entries.map(e => e._id === updatedEntry._id ? updatedEntry : e));
    fetchData();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Layer */}
      <nav className="glass" style={{ 
        position: 'sticky', top: 0, zIndex: 100,
        padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            background: 'var(--accent-color)', 
            padding: '0.5rem', 
            borderRadius: '12px',
            display: 'flex', alignItems: 'center'
          }}>
            <BrainCircuit size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            Mindful Collector
          </span>
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <header style={{ marginBottom: '3rem', maxWidth: '600px' }}>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem', lineHeight: 1.1 }}>
            Preserve your <span style={{ color: 'var(--accent-color)' }}>Mental Space</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.5 }}>
            Capture reflections from your immersive nature sessions and let AI illuminate your emotional landscape.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) 1fr', gap: '3rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <JournalForm onEntryAdded={handleEntryAdded} />
            <JournalList entries={entries} onEntryUpdated={handleEntryUpdated} />
          </div>
          
          <aside style={{ position: 'sticky', top: '7rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Insights insights={insights} />
            
            <div className="premium-card glass" style={{ borderStyle: 'dashed', background: 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Info size={18} color="var(--accent-color)" />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>The Process</h3>
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>Select a session environment to anchor your reflection.</li>
                <li>Write freely about your sensory and emotional experience.</li>
                <li>Analyze entries to reveal hidden patterns.</li>
                <li>Watch your Mental Overview evolve over time.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer style={{ 
        padding: '3rem 2rem', textAlign: 'center', 
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-secondary)', fontSize: '0.85rem'
      }}>
        Designed for personal growth and mental clarity. Prototype build.
      </footer>
    </div>
  );
}

export default App;
