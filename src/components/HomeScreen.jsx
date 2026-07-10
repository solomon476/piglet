import React, { useState, useEffect } from 'react';
import { entries, categories } from '../data/mockData';

export default function HomeScreen({ onSelectEntry, isTransitioning }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [bgImage, setBgImage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Filter entries based on query and category
  const filteredEntries = entries.filter(e => {
    const matchesQuery = e.word.toLowerCase().includes(query.toLowerCase()) || 
                         e.definition.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory ? e.category === activeCategory : true;
    return matchesQuery && matchesCategory;
  });

  // Update background image based on active category
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

  return (
    <div className={`home-immersive ${visible ? 'visible' : ''}`} style={{ opacity: isTransitioning ? 0 : 1 }}>
      {/* Dynamic Ambient Background */}
      <div className="home-ambient-bg" style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none', opacity: bgImage ? 0.25 : 0 }} />
      <div className="home-ambient-overlay" />

      <div className="home-content">
        <header className="home-header">
          <h1 className="home-title serif">Piglet</h1>
          <p className="home-subtitle">Every word has a story.</p>
        </header>

        <main className="home-main">
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
        .home-immersive.visible {
          opacity: 1;
        }
        .home-ambient-bg {
          position: absolute;
          inset: -5%;
          width: 110%;
          height: 110%;
          background-size: cover;
          background-position: center;
          filter: blur(40px) saturate(1.5);
          transition: background-image 1.5s ease, opacity 2s ease;
          z-index: 0;
        }
        .home-ambient-overlay {
          position: absolute;
          inset: 0;
          background: var(--bg-color);
          opacity: 0.85;
          z-index: 1;
        }
        
        [data-theme='dark'] .home-ambient-bg, [data-theme='midnight'] .home-ambient-bg {
          opacity: 0.4 !important;
        }
        [data-theme='dark'] .home-ambient-overlay, [data-theme='midnight'] .home-ambient-overlay {
          opacity: 0.9;
        }

        .home-content {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 60px 24px;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        .home-header {
          text-align: center;
          margin-bottom: 12vh;
        }
        .home-title {
          font-size: 1.2rem;
          letter-spacing: 0.15em;
          opacity: 0.5;
          text-transform: uppercase;
        }
        .home-subtitle {
          font-size: 0.75rem;
          opacity: 0.3;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-top: 12px;
        }

        .home-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .search-container {
          width: 100%;
          max-width: 700px;
          position: relative;
          margin-bottom: 50px;
        }
        .immersive-search {
          width: 100%;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: clamp(2.5rem, 6vw, 4rem);
          text-align: center;
          outline: none;
          padding: 10px 0;
          transition: color 0.4s ease;
        }
        .immersive-search::placeholder {
          color: var(--text-primary);
          opacity: 0.15;
        }
        .search-underline {
          height: 1px;
          width: 0%;
          background: var(--text-primary);
          margin: 0 auto;
          transition: width 1s cubic-bezier(0.2, 0.8, 0.2, 1);
          opacity: 0.2;
        }
        .immersive-search:focus + .search-underline {
          width: 60%;
        }

        .organic-categories {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 32px;
          margin-bottom: 60px;
        }
        .organic-category {
          font-size: 0.85rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          opacity: 0.4;
          transition: all 0.5s ease;
          position: relative;
          padding: 4px 8px;
        }
        .organic-category:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }
        .organic-category.active {
          opacity: 1;
          color: var(--accent-color);
        }

        .results-container {
          width: 100%;
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          padding-bottom: 80px;
        }
        .result-item {
          display: flex;
          flex-direction: column;
          text-align: left;
          gap: 12px;
          padding: 24px;
          border-radius: 4px;
          transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
          animation: slideUp 0.8s ease forwards;
          opacity: 0;
          border-left: 1px solid transparent;
        }
        .result-item:hover {
          transform: translateX(12px);
          border-left: 1px solid var(--accent-color);
        }
        .result-word {
          font-size: 2.5rem;
          color: var(--text-primary);
          transition: color 0.4s ease;
        }
        .result-item:hover .result-word {
          color: var(--accent-color);
        }
        .result-def {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          opacity: 0.7;
          font-family: var(--font-serif);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
