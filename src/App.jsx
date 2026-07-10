import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
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

  const sounds = ['None', 'Page Flip', 'Rain', 'Forest', 'Fireplace'];

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
            background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer', transition: 'all 0.4s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'rotate(45deg)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'rotate(0)'; }}
        >
          <Settings size={20} strokeWidth={1.5} />
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
              background: 'var(--bg-color)', 
              borderRadius: '24px 24px 0 0',
              padding: '40px 32px 60px', width: '100%', maxWidth: '700px',
              animation: 'slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div style={{
              width: '32px', height: '3px', background: 'var(--text-secondary)', opacity: 0.3,
              borderRadius: '2px', margin: '0 auto 40px',
            }} />

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '40px', fontStyle: 'italic', textAlign: 'center', color: 'var(--text-primary)' }}>
              Settings
            </h2>

            {/* Theme */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center' }}>
                Atmosphere
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    style={{
                      padding: '8px 20px',
                      border: `1px solid ${theme === t.id ? 'var(--text-primary)' : 'transparent'}`,
                      borderRadius: '30px',
                      background: 'transparent',
                      color: theme === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.4s ease',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Sound */}
            <div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center' }}>
                Background Sound
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {sounds.map(s => (
                  <button
                    key={s}
                    onClick={() => setAmbientSound(s === 'None' ? null : s)}
                    style={{
                      padding: '8px 20px',
                      border: `1px solid ${ambientSound === s || (s === 'None' && !ambientSound) ? 'var(--text-primary)' : 'transparent'}`,
                      borderRadius: '30px',
                      background: 'transparent',
                      color: ambientSound === s || (s === 'None' && !ambientSound) ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.4s ease',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.05em'
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
