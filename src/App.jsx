import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import OpeningScreen from './components/OpeningScreen';
import HomeScreen from './components/HomeScreen';
import EntryPage from './components/EntryPage';
import Constellation from './components/Constellation';
import StoryMode from './components/StoryMode';
import VaultScreen from './components/VaultScreen';
import FutureLetters from './components/FutureLetters';
import MoodCalendar from './components/MoodCalendar';
import PlacesMap from './components/PlacesMap';
import LegacyScreen from './components/LegacyScreen';
import CountdownScreen from './components/CountdownScreen';
import { entries } from './data/mockData';
import { getSettings, saveSettings, getDaysSinceLastVisit, updateLastVisit } from './utils/storage';

const themes = [
  { id: 'old-paper', label: 'Old Paper' },
  { id: 'dark', label: 'Dark' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'forest', label: 'Forest' },
  { id: 'vintage', label: 'Vintage' },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('');
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [userSettings, setUserSettings] = useState(getSettings());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [daysAway, setDaysAway] = useState(0);

  useEffect(() => {
    // Initial boot logic
    const days = getDaysSinceLastVisit();
    setDaysAway(days);
    
    if (days > 365) {
      setCurrentScreen('legacy');
    } else if (userSettings.alwaysShowPinnedFirst && userSettings.pinnedEntryId) {
      setCurrentScreen('countdown');
    } else {
      setCurrentScreen('opening');
    }
    
    updateLastVisit();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', userSettings.theme);
  }, [userSettings.theme]);

  const updateSetting = (key, value) => {
    const newSettings = { ...userSettings, [key]: value };
    setUserSettings(newSettings);
    saveSettings(newSettings);
  };

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

  if (!currentScreen) return null; // loading

  return (
    <div style={{ transition: 'opacity 0.6s ease', opacity: isTransitioning ? 0 : 1 }}>
      
      {currentScreen === 'legacy' && (
        <LegacyScreen daysAway={daysAway} onContinue={() => navigate(userSettings.alwaysShowPinnedFirst ? 'countdown' : 'opening')} />
      )}

      {currentScreen === 'countdown' && (
        <CountdownScreen entryId={userSettings.pinnedEntryId} onContinue={() => navigate('home')} />
      )}

      {currentScreen === 'opening' && (
        <OpeningScreen onOpen={() => navigate('home')} isTransitioning={isTransitioning} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onSelectEntry={(id) => navigate('entry', id)}
          onOpenSettings={() => setShowSettings(true)}
          userSettings={userSettings}
          onNavigate={navigate}
          isTransitioning={isTransitioning}
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

      {currentScreen === 'constellation' && <Constellation onBack={() => navigate('home')} onSelectEntry={(id) => navigate('entry', id)} />}
      {currentScreen === 'story' && <StoryMode onBack={() => navigate('home')} />}
      {currentScreen === 'vault' && <VaultScreen onBack={() => navigate('home')} />}
      {currentScreen === 'letters' && <FutureLetters onBack={() => navigate('home')} />}
      {currentScreen === 'moods' && <MoodCalendar onBack={() => navigate('home')} />}
      {currentScreen === 'places' && <PlacesMap onBack={() => navigate('home')} onSelectEntry={(id) => navigate('entry', id)} />}

      {/* Floating Settings Button */}
      {['home', 'entry'].includes(currentScreen) && (
        <button
          onClick={() => setShowSettings(true)}
          style={{
            position: 'fixed', bottom: '28px', right: '28px', zIndex: 50,
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'transparent', border: 'none',
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
              boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
              color: 'var(--text-primary)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width: '32px', height: '3px', background: 'var(--text-secondary)', opacity: 0.3, borderRadius: '2px', margin: '0 auto 40px' }} />

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '40px', fontStyle: 'italic', textAlign: 'center' }}>
              Settings
            </h2>

            {/* Pin Entry Setting */}
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                ⭐ Pin Entry
              </p>
              <select 
                value={userSettings.pinnedEntryId} 
                onChange={(e) => updateSetting('pinnedEntryId', e.target.value)}
                style={{
                  padding: '10px 20px', borderRadius: '4px', background: 'var(--bg-color)', 
                  color: 'var(--text-primary)', border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-sans)', fontSize: '1rem', marginBottom: '16px'
                }}
              >
                {entries.map(e => <option key={e.id} value={e.id}>{e.word}</option>)}
              </select>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    checked={userSettings.alwaysShowPinnedFirst}
                    onChange={(e) => updateSetting('alwaysShowPinnedFirst', e.target.checked)}
                  />
                  Always show first on startup
                </label>
              </div>
            </div>

            {/* Theme */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center' }}>
                Atmosphere
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => updateSetting('theme', t.id)}
                    style={{
                      padding: '8px 20px',
                      border: `1px solid ${userSettings.theme === t.id ? 'var(--text-primary)' : 'transparent'}`,
                      borderRadius: '30px', background: 'transparent',
                      color: userSettings.theme === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.4s ease',
                      fontFamily: 'var(--font-sans)', letterSpacing: '0.05em'
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
                    onClick={() => updateSetting('ambientSound', s === 'None' ? null : s)}
                    style={{
                      padding: '8px 20px',
                      border: `1px solid ${userSettings.ambientSound === s || (s === 'None' && !userSettings.ambientSound) ? 'var(--text-primary)' : 'transparent'}`,
                      borderRadius: '30px', background: 'transparent',
                      color: userSettings.ambientSound === s || (s === 'None' && !userSettings.ambientSound) ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.4s ease',
                      fontFamily: 'var(--font-sans)', letterSpacing: '0.05em'
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
