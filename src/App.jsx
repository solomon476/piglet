import React, { useState, useEffect } from 'react';
import OpeningScreen from './components/OpeningScreen';
import HomeScreen from './components/HomeScreen';
import EntryPage from './components/EntryPage';
import { entries } from './data/mockData';

const themes = [
  { id: 'old-paper', label: 'Old Paper' },
  { id: 'dark', label: 'Dark' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'forest', label: 'Forest' },
  { id: 'vintage', label: 'Vintage' },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('opening');
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [theme, setTheme] = useState('old-paper');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [ambientSound, setAmbientSound] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const navigate = (screen, entryId = null) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      if (entryId) setSelectedEntryId(entryId);
      setIsTransitioning(false);
    }, 600);
  };

  const selectedEntry = entries.find(e => e.id === selectedEntryId);

  const sounds = ['None', '📄 Page Flip', '🌧️ Rain', '🌲 Forest', '🔥 Fireplace'];

  return (
    <div style={{ transition: 'opacity 0.6s ease', opacity: isTransitioning ? 0 : 1 }}>
      {currentScreen === 'opening' && (
        <OpeningScreen onOpen={() => navigate('home')} isTransitioning={isTransitioning} />
      )}
      {currentScreen === 'home' && (
        <HomeScreen
          onSelectEntry={(id) => navigate('entry', id)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}
      {currentScreen === 'entry' && selectedEntry && (
        <EntryPage
          entry={selectedEntry}
          onBack={() => navigate('home')}
          onOpenSettings={() => setShowSettings(true)}
          onSelectRelated={(id) => navigate('entry', id)}
        />
      )}

      {/* Floating Settings Button (on non-opening screens) */}
      {currentScreen !== 'opening' && (
        <button
          onClick={() => setShowSettings(true)}
          style={{
            position: 'fixed', bottom: '28px', right: '28px', zIndex: 50,
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'var(--card-bg)', border: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-md)', color: 'var(--text-secondary)',
            cursor: 'pointer', transition: 'all 0.2s',
            fontSize: '1rem'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(30deg) scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0) scale(1)'; }}
        >
          ⚙️
        </button>
      )}

      {/* Settings Overlay */}
      {showSettings && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            style={{
              background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)',
              borderRadius: '12px 12px 0 0',
              padding: '32px 24px 48px', width: '100%', maxWidth: '700px',
              animation: 'slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div style={{
              width: '40px', height: '4px', background: 'var(--border-color)',
              borderRadius: '2px', margin: '0 auto 28px',
            }} />

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '28px', fontStyle: 'italic' }}>
              Settings
            </h2>

            {/* Theme */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Theme
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    style={{
                      padding: '10px 18px',
                      border: `1px solid ${theme === t.id ? 'var(--accent-color)' : 'var(--border-color)'}`,
                      borderRadius: '3px',
                      background: theme === t.id ? 'var(--accent-color)' : 'var(--card-bg)',
                      color: theme === t.id ? 'var(--bg-color)' : 'var(--text-primary)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Sound */}
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Ambient Sound
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {sounds.map(s => (
                  <button
                    key={s}
                    onClick={() => setAmbientSound(s === 'None' ? null : s)}
                    style={{
                      padding: '10px 18px',
                      border: `1px solid ${ambientSound === s || (s === 'None' && !ambientSound) ? 'var(--accent-color)' : 'var(--border-color)'}`,
                      borderRadius: '3px',
                      background: ambientSound === s || (s === 'None' && !ambientSound) ? 'var(--accent-color)' : 'var(--card-bg)',
                      color: ambientSound === s || (s === 'None' && !ambientSound) ? 'var(--bg-color)' : 'var(--text-primary)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
