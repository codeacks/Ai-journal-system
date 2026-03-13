import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="glass"
      style={{
        padding: '0.75rem',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} color="var(--text-primary)" />
      ) : (
        <Sun size={20} color="var(--text-primary)" />
      )}
    </button>
  );
};

export default ThemeToggle;
