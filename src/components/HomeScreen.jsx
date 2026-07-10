import React, { useState, useEffect } from 'react';
import { entries, categories, dailyQuotes } from '../data/mockData';

export default function HomeScreen({ onSelectEntry, onNavigate, userSettings, isTransitioning }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [bgImage, setBgImage] = useState('');
  const [visible, setVisible] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setVisible(true);
    setQuoteIndex(Math.floor(Math.random() * dailyQuotes.length));
  }, []);

  const filteredEntries = entries.filter(e => {
    const matchesQuery = e.word.toLowerCase().includes(query.toLowerCase()) || 
                         e.definition.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory ? e.category === activeCategory : true;
    return matchesQuery && matchesCategory;
  });

  useEffect(() => {
    if (activeCategory) {
      const cat = categories.find(c => c.id === activeCategory);
      if (cat) setBgImage(cat.image);
    } else if (query && filteredEntries.length > 0 && filteredEntries[0].gallery && filteredEntries[0].gallery.length > 0) {
      setBgImage(filteredEntries[0].gallery[0].url);
    } else {
      setBgImage('');
    }
  }, [activeCategory, query, filteredEntries]);

  const navItems = [
    { id: 'constellation', label: 'Constellation', icon: '✨' },
    { id: 'story', label: 'Story Mode', icon: '📖' },
    { id: 'places', label: 'Places', icon: '🌍' },
    { id: 'moods', label: 'Moods', icon: '😊' },
    { id: 'letters', label: 'Letters', icon: '✍️' },
    { id: 'vault', label: 'Vault', icon: '🔒' }
  ];

  const pinnedEntry = entries.find(e => e.id === userSettings?.pinnedEntryId);

  return (
    <div className={`home-immersive ${visible ? 'visible' : ''}`} style={{ opacity: isTransitioning ? 0 : 1 }}>
      <div className="home-ambient-bg" style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none', opacity: bgImage ? 0.25 : 0 }} />
      <div className="home-ambient-overlay" />

      <div className="home-content">
        <header className="home-header">
          <h1 className="home-title serif">Piglet</h1>
          <p className="home-subtitle" style={{ fontStyle: 'italic', opacity: 0.5, marginTop: '8px', textTransform: 'none', letterSpacing: '0.05em' }}>
            "{dailyQuotes[quoteIndex]}"
          </p>
        </header>

        {/* Top Navigation Bar */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '8px 16px',
                borderRadius: '30px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: 0.7,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <main className="home-main">
          {/* Pinned Entry Widget */}
          {pinnedEntry && !userSettings.alwaysShowPinnedFirst && (
            <div 
              onClick={() => onNavigate('countdown')}
              style={{
                border: '1px solid var(--border-color)',
                padding: '16px 24px',
                borderRadius: '8px',
                marginBottom: '40px',
                width: '100%',
                maxWidth: '700px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>⭐</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>{pinnedEntry.word}</span>
              </div>
              <span style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Next Chapter →</span>
            </div>
          )}

          <div className="search-container">
            <input 
              type="text" 
              className="immersive-search serif" 
              placeholder="What are you remembering today?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <div className="search-underline" />
          </div>

          <div className="organic-categories">
            {categories.map((cat, i) => (
              <button 
                key={i} 
                className={`organic-category ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              >
                {cat.id}
              </button>
            ))}
          </div>

          <div className="results-container">
            {filteredEntries.map((entry, i) => (
              <button 
                key={entry.id} 
                className="result-item"
                onClick={() => onSelectEntry(entry.id)}
                style={{ animationDelay: `${i * 0.1}s` }}
                onMouseEnter={() => {
                  if (entry.gallery && entry.gallery.length > 0) {
                    setBgImage(entry.gallery[0].url);
                  }
                }}
                onMouseLeave={() => {
                  if (!activeCategory) setBgImage('');
                }}
              >
                <span className="result-word serif">{entry.word}</span>
                <span className="result-def">{entry.definition}</span>
              </button>
            ))}
          </div>
        </main>
      </div>

      <style>{`
        .home-immersive {
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          color: var(--text-primary);
          opacity: 0;
          transition: opacity 1.5s ease;
          overflow: hidden;
        }
        .home-immersive.visible { opacity: 1; }
        .home-ambient-bg {
          position: absolute; inset: -5%; width: 110%; height: 110%;
          background-size: cover; background-position: center;
          filter: blur(40px) saturate(1.5);
          transition: background-image 1.5s ease, opacity 2s ease;
          z-index: 0;
        }
        .home-ambient-overlay {
          position: absolute; inset: 0; background: var(--bg-color); opacity: 0.85; z-index: 1;
        }
        [data-theme='dark'] .home-ambient-bg, [data-theme='midnight'] .home-ambient-bg { opacity: 0.4 !important; }
        [data-theme='dark'] .home-ambient-overlay, [data-theme='midnight'] .home-ambient-overlay { opacity: 0.9; }

        .home-content {
          position: relative; z-index: 10; flex: 1; display: flex; flex-direction: column;
          padding: 60px 24px; max-width: 900px; margin: 0 auto; width: 100%;
        }
        .home-header { text-align: center; margin-bottom: 40px; }
        .home-title { font-size: 1.2rem; letter-spacing: 0.15em; opacity: 0.5; text-transform: uppercase; }

        .home-main { display: flex; flex-direction: column; align-items: center; flex: 1; }

        .search-container { width: 100%; max-width: 700px; position: relative; margin-bottom: 50px; }
        .immersive-search {
          width: 100%; background: transparent; border: none; color: var(--text-primary);
          font-size: clamp(2.5rem, 6vw, 4rem); text-align: center; outline: none; padding: 10px 0; transition: color 0.4s ease;
        }
        .immersive-search::placeholder { color: var(--text-primary); opacity: 0.15; }
        .search-underline {
          height: 1px; width: 0%; background: var(--text-primary); margin: 0 auto;
          transition: width 1s cubic-bezier(0.2, 0.8, 0.2, 1); opacity: 0.2;
        }
        .immersive-search:focus + .search-underline { width: 60%; }

        .organic-categories { display: flex; flex-wrap: wrap; justify-content: center; gap: 32px; margin-bottom: 60px; }
        .organic-category {
          font-size: 0.85rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.2em;
          opacity: 0.4; transition: all 0.5s ease; position: relative; padding: 4px 8px; cursor: pointer; background: none; border: none;
        }
        .organic-category:hover { opacity: 0.8; transform: translateY(-2px); }
        .organic-category.active { opacity: 1; color: var(--accent-color); }

        .results-container { width: 100%; max-width: 640px; display: flex; flex-direction: column; gap: 40px; padding-bottom: 80px; }
        .result-item {
          display: flex; flex-direction: column; text-align: left; gap: 12px; padding: 24px; border-radius: 4px;
          transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); animation: slideUp 0.8s ease forwards; opacity: 0;
          border-left: 1px solid transparent; background: none; border-top: none; border-right: none; border-bottom: none; cursor: pointer;
        }
        .result-item:hover { transform: translateX(12px); border-left: 1px solid var(--accent-color); }
        .result-word { font-size: 2.5rem; color: var(--text-primary); transition: color 0.4s ease; }
        .result-item:hover .result-word { color: var(--accent-color); }
        .result-def { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; opacity: 0.7; font-family: var(--font-serif); font-style: italic; }
      `}</style>
    </div>
  );
}
