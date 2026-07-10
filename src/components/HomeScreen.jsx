import React, { useState, useRef, useEffect } from 'react';
import { Users, Music, MapPin, Lightbulb, Smile, Camera, Quote, Clock } from 'lucide-react';
import { entries, categories } from '../data/mockData';

const todayWord = entries[0];

export default function HomeScreen({ onSelectEntry, isTransitioning }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      const results = entries.filter(en =>
        en.word.toLowerCase().includes(val.toLowerCase())
      );
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSearch(false);
  };

  return (
    <div className={`screen-content home-screen ${visible ? 'visible' : ''}`}>

      {/* Header */}
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-brand">
            <svg className="home-brand-icon" viewBox="0 0 40 40" fill="currentColor">
              <ellipse cx="20" cy="23" rx="13" ry="10" />
              <ellipse cx="11" cy="18" rx="6" ry="5" />
              <ellipse cx="10" cy="16" rx="3" ry="2" fill="var(--bg-color)" />
              <circle cx="9" cy="16" r="0.8" fill="var(--text-primary)" />
              <circle cx="11" cy="16" r="0.8" fill="var(--text-primary)" />
              <ellipse cx="30" cy="21" rx="4" ry="3" />
              <ellipse cx="15" cy="31" rx="2.5" ry="3" />
              <ellipse cx="21" cy="32" rx="2.5" ry="3" />
              <ellipse cx="27" cy="31" rx="2.5" ry="3" />
            </svg>
            <h1 className="home-brand-name serif">Piglet Dictionary</h1>
          </div>
          <p className="home-brand-tag">Every word has a story.</p>
        </div>
      </header>

      {/* Search */}
      <div className="home-search-wrap">
        <div className="home-search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={searchRef}
            className="home-search-input"
            type="text"
            placeholder="Search any word..."
            value={query}
            onChange={handleSearch}
          />
          {query && (
            <button className="search-clear" onClick={clearSearch}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearch && (
          <div className="search-results">
            {searchResults.length > 0 ? searchResults.map(entry => (
              <button
                key={entry.id}
                className="search-result-item"
                onClick={() => { clearSearch(); onSelectEntry(entry.id); }}
              >
                <span className="search-result-word serif">{entry.word}</span>
                <span className="search-result-category">{entry.category}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            )) : (
              <div className="search-empty">
                <p>No entries found for "<em>{query}</em>"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="home-body">

        {/* Today's Word */}
        <section className="today-word-card" onClick={() => onSelectEntry(todayWord.id)}>
          <div className="today-word-label">
            <span className="dot pulse" />
            Today's Word
          </div>
          <h2 className="today-word-title serif">{todayWord.word}</h2>
          <p className="today-word-pronunciation">{todayWord.pronunciation}</p>
          <p className="today-word-def">"{todayWord.definition}"</p>
          <div className="today-word-cta">
            <span>Continue Reading</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </section>

        {/* Categories */}
        <section className="categories-section">
          <h3 className="section-title serif">Browse by Category</h3>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <button 
                key={i} 
                className={`category-photo-card ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              >
                <img src={cat.image} alt={cat.id} className="category-bg" />
                <div className="category-overlay" />
                <span className="category-photo-label serif">{cat.id}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Entries */}
        <section className="recent-section">
          <h3 className="section-title serif">
            {activeCategory ? `${activeCategory} Entries` : "Recent Entries"}
          </h3>
          <div className="recent-scroll">
            {(activeCategory ? entries.filter(e => e.category === activeCategory) : entries.slice(0, 5)).map(entry => (
              <button
                key={entry.id}
                className="recent-card"
                onClick={() => onSelectEntry(entry.id)}
              >
                <span className="recent-card-word serif">{entry.word}</span>
                <span className="recent-card-category">{entry.category}</span>
                {entry.isFavorite && (
                  <svg className="recent-card-fav" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </section>

      </div>

      <style>{`
        .home-screen {
          min-height: 100vh;
          background: var(--bg-color);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .home-screen.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .home-header {
          border-bottom: 1px solid var(--border-color);
          padding: 28px 0 20px;
          background: var(--bg-color);
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .home-header-inner {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (max-width: 600px) {
          .home-header-inner { padding: 0 16px; }
        }
        .home-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }
        .home-brand-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-color);
          opacity: 0.8;
        }
        .home-brand-name {
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--text-primary);
        }
        .home-brand-tag {
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.12em;
          margin-left: 44px;
        }
        .home-search-wrap {
          max-width: 700px;
          margin: 24px auto 0;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }
        @media (max-width: 600px) {
          .home-search-wrap { padding: 0 16px; margin-top: 16px; }
        }
        .home-search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 14px 18px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .home-search-box:focus-within {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px rgba(212, 163, 115, 0.12);
        }
        .search-icon { color: var(--text-secondary); flex-shrink: 0; }
        .home-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .home-search-input::placeholder { color: var(--text-secondary); }
        .search-clear {
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .search-clear:hover { color: var(--text-primary); }
        .search-results {
          position: absolute;
          top: calc(100% + 6px);
          left: 24px;
          right: 24px;
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
          animation: slideUp 0.25s ease;
        }
        .search-result-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-color);
          background: none;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s;
        }
        .search-result-item:last-child { border-bottom: none; }
        .search-result-item:hover { background: var(--card-bg); }
        .search-result-word { font-family: var(--font-serif); font-size: 1rem; flex: 1; }
        .search-result-category { font-size: 0.75rem; color: var(--text-secondary); }
        .search-empty { padding: 18px; text-align: center; color: var(--text-secondary); font-size: 0.85rem; }
        .home-body {
          max-width: 700px;
          margin: 0 auto;
          padding: 32px 24px 80px;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        @media (max-width: 600px) {
          .home-body { padding: 24px 16px 80px; gap: 40px; }
        }
        .today-word-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .today-word-card { padding: 24px; }
        }
        .today-word-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--accent-color);
        }
        .today-word-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .today-word-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent-color);
        }
        .dot.pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .today-word-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .today-word-pronunciation {
          font-size: 0.85rem;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          margin-bottom: 16px;
          font-style: italic;
        }
        .today-word-def {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 24px;
          padding-left: 16px;
          border-left: 2px solid var(--border-color);
        }
        .today-word-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--accent-color);
          letter-spacing: 0.06em;
        }
        .section-title {
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 18px;
          color: var(--text-primary);
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 500px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .category-photo-card {
          position: relative;
          height: 110px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--border-color);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .category-photo-card:hover { transform: scale(1.04); border-color: var(--accent-color); z-index: 2; box-shadow: var(--shadow-md); }
        .category-photo-card.active { border: 2px solid var(--accent-color); transform: scale(1.06); z-index: 3; box-shadow: var(--shadow-md); }
        .category-bg {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        .category-photo-card:hover .category-bg { transform: scale(1.15); }
        .category-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1));
        }
        .category-photo-label {
          position: absolute; bottom: 12px; left: 14px;
          color: rgba(255, 255, 255, 0.95); font-size: 1.1rem; font-weight: 400; z-index: 2;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .recent-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: thin;
          scrollbar-color: var(--border-color) transparent;
        }
        .recent-card {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
          padding: 20px 22px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          min-width: 140px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }
        .recent-card:hover {
          border-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .recent-card-word { font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-primary); }
        .recent-card-category { font-size: 0.7rem; color: var(--text-secondary); }
        .recent-card-fav { position: absolute; top: 12px; right: 12px; color: var(--accent-color); }
      `}</style>
    </div>
  );
}
