import React, { useState, useEffect, useRef } from 'react';
import { entries } from '../data/mockData';

export default function EntryPage({ entry, onBack, onSelectRelated }) {
  const [visible, setVisible] = useState(false);
  const [isFav, setIsFav] = useState(entry.isFavorite);
  const [activeGallery, setActiveGallery] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [privateNote, setPrivateNote] = useState('');
  const titleRef = useRef(null);
  const holdTimer = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(holdTimer.current);
  }, []);

  const relatedEntries = entries.filter(e => entry.related.includes(e.id));

  const handleTitleMouseDown = () => {
    holdTimer.current = setTimeout(() => setDrawerOpen(true), 800);
  };
  const handleTitleMouseUp = () => clearTimeout(holdTimer.current);

  return (
    <div className={`entry-page ${visible ? 'visible' : ''}`}>

      {/* Back */}
      <div className="entry-nav">
        <div className="entry-nav-inner">
          <button className="entry-back" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Dictionary
          </button>
          <button className={`entry-fav ${isFav ? 'active' : ''}`} onClick={() => setIsFav(!isFav)}>
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      <div className="entry-body">

        {/* Hero / Title */}
        <section className="entry-hero">
          <div className="entry-category-badge">{entry.category}</div>
          <h1
            ref={titleRef}
            className="entry-title serif"
            onMouseDown={handleTitleMouseDown}
            onMouseUp={handleTitleMouseUp}
            onTouchStart={handleTitleMouseDown}
            onTouchEnd={handleTitleMouseUp}
            title="Hold to reveal hidden options"
          >
            {entry.word}
          </h1>
          <p className="entry-pronunciation">{entry.pronunciation}</p>
          <div className="entry-meta">
            <span className="entry-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Created {entry.created}
            </span>
          </div>
        </section>

        <div className="entry-divider" />

        {/* Definition */}
        <section className="entry-section">
          <h2 className="entry-section-label">Definition</h2>
          <div className="entry-definition-block">
            <p className="entry-definition serif">{entry.definition}</p>
          </div>
        </section>

        {/* Story */}
        {entry.story && (
          <section className="entry-section">
            <h2 className="entry-section-label">Story</h2>
            <div className="entry-story-block">
              <p className="entry-story">{entry.story}</p>
            </div>
          </section>
        )}

        {/* Gallery */}
        {entry.gallery && entry.gallery.length > 0 && (
          <section className="entry-section">
            <h2 className="entry-section-label">Gallery</h2>
            <div className="entry-gallery">
              {entry.gallery.map((item, i) => (
                <div key={i} className="gallery-item" onClick={() => setActiveGallery(item)}>
                  <img src={item.url} alt={item.caption} loading="lazy" />
                  <div className="gallery-caption">{item.caption}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Music */}
        {entry.music && (
          <section className="entry-section">
            <h2 className="entry-section-label">Song Attached</h2>
            <div className="music-card">
              <div className="music-disk" style={{ animation: isPlaying ? 'spin 4s linear infinite' : 'none' }}>
                <div className="music-disk-inner" />
              </div>
              <div className="music-info">
                <p className="music-title serif">{entry.music.title}</p>
                <p className="music-artist">{entry.music.artist}</p>
              </div>
              <button className="music-play" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                )}
              </button>
            </div>
          </section>
        )}

        {/* Timeline */}
        {entry.timeline && entry.timeline.length > 0 && (
          <section className="entry-section">
            <h2 className="entry-section-label">Timeline</h2>
            <div className="timeline">
              {entry.timeline.map((item, i) => (
                <div key={i} className={`timeline-item ${i === entry.timeline.length - 1 ? 'last' : ''}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-line" />
                  <div className="timeline-content" onClick={() => setExpandedTimeline(expandedTimeline === i ? null : i)}>
                    <p className="timeline-title serif">{item.title}</p>
                    <p className="timeline-date">{item.date}</p>
                    {expandedTimeline === i && (
                      <p className="timeline-details">{item.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mood */}
        {entry.mood && entry.mood.length > 0 && (
          <section className="entry-section entry-section-row">
            <div className="entry-half">
              <h2 className="entry-section-label">Mood</h2>
              <div className="mood-icons">
                {entry.mood.map((m, i) => (
                  <span key={i} className="mood-icon">{m}</span>
                ))}
              </div>
            </div>

            {/* Weather */}
            {entry.weather && (
              <div className="entry-half">
                <h2 className="entry-section-label">Weather</h2>
                <div className="weather-badge">
                  <span className="weather-icon">{entry.weather.icon}</span>
                  <div>
                    <p className="weather-cond serif">{entry.weather.condition}</p>
                    <p className="weather-temp">{entry.weather.temp}</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Locations */}
        {entry.locations && entry.locations.length > 0 && (
          <section className="entry-section">
            <h2 className="entry-section-label">Locations</h2>
            <div className="locations-mini-map">
              <div className="map-bg">
                <div className="map-grid" />
                {entry.locations.map((loc, i) => (
                  <div key={i} className="map-pin" style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + (i % 2) * 25}%`
                  }}>
                    <div className="map-pin-dot" />
                    <span className="map-pin-label">📍 {loc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Voice Note */}
        <section className="entry-section">
          <h2 className="entry-section-label">Voice Memory</h2>
          <div className="voice-card">
            <div className="voice-wave">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="wave-bar" style={{ height: `${10 + Math.sin(i * 0.8) * 18 + Math.random() * 12}px` }} />
              ))}
            </div>
            <button className="voice-play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Play Memory
            </button>
            <p className="voice-hint">Imagine hearing yourself, years later.</p>
          </div>
        </section>

        {/* Related Entries */}
        {relatedEntries.length > 0 && (
          <section className="entry-section">
            <h2 className="entry-section-label">Related Entries</h2>
            <div className="related-list">
              {relatedEntries.map(rel => (
                <button key={rel.id} className="related-item" onClick={() => onSelectRelated && onSelectRelated(rel.id)}>
                  <span className="related-word serif">{rel.word}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Private Notes */}
        <section className="entry-section">
          <div className="notes-header">
            <h2 className="entry-section-label">Private Notes</h2>
            <button className="notes-toggle" onClick={() => setShowNotes(!showNotes)}>
              {showNotes ? 'Hide' : 'Show'}
            </button>
          </div>
          {showNotes && (
            <div className="notes-area">
              <textarea
                className="notes-textarea"
                placeholder="Nobody else sees this. Just you..."
                value={privateNote}
                onChange={e => setPrivateNote(e.target.value)}
              />
            </div>
          )}
        </section>

        {/* Closing Quote */}
        <section className="entry-quote-section">
          <div className="entry-quote-mark serif">"</div>
          <blockquote className="entry-quote serif">{entry.quote}</blockquote>
        </section>

      </div>

      {/* Gallery Lightbox */}
      {activeGallery && (
        <div className="lightbox" onClick={() => setActiveGallery(null)}>
          <button className="lightbox-close">✕</button>
          <img src={activeGallery.url} alt={activeGallery.caption} className="lightbox-img" />
          <p className="lightbox-caption">{activeGallery.caption}</p>
        </div>
      )}

      {/* Hidden Drawer */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-handle" />
            <h3 className="drawer-title serif">Hidden</h3>
            {['Private Notes', 'Drafts', 'Deleted Memories', 'Archive'].map(item => (
              <button key={item} className="drawer-item">
                <span>{item}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
            <button className="drawer-close" onClick={() => setDrawerOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes waveAnim {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.6); }
        }

        .entry-page {
          min-height: 100vh;
          background: var(--bg-color);
          opacity: 0;
          transform: perspective(1000px) rotateY(-6deg) translateX(30px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .entry-page.visible {
          opacity: 1;
          transform: perspective(1000px) rotateY(0) translateX(0);
        }
        .entry-nav {
          border-bottom: 1px solid var(--border-color);
          padding: 16px 0;
          background: var(--bg-color);
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .entry-nav-inner {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .entry-back {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .entry-back:hover { color: var(--text-primary); }
        .entry-fav {
          font-size: 1.1rem;
          transition: transform 0.2s;
        }
        .entry-fav.active { transform: scale(1.2); }
        .entry-body {
          max-width: 700px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          display: flex;
          flex-direction: column;
          gap: 44px;
        }
        .entry-hero { text-align: left; }
        .entry-category-badge {
          display: inline-block;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
          padding: 3px 10px;
          border-radius: 2px;
          margin-bottom: 20px;
          opacity: 0.8;
        }
        .entry-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 1.0;
          margin-bottom: 12px;
          cursor: default;
          user-select: none;
          transition: color 0.2s;
        }
        .entry-title:active { color: var(--accent-color); }
        .entry-pronunciation {
          font-size: 1rem;
          color: var(--text-secondary);
          font-style: italic;
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }
        .entry-meta {
          display: flex;
          gap: 20px;
        }
        .entry-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
        }
        .entry-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, var(--accent-color), transparent);
          opacity: 0.4;
        }
        .entry-section { display: flex; flex-direction: column; gap: 14px; }
        .entry-section-row { flex-direction: row; gap: 24px; }
        .entry-half { flex: 1; display: flex; flex-direction: column; gap: 14px; }
        .entry-section-label {
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-weight: 400;
        }
        .entry-definition-block {
          padding: 24px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--accent-color);
          border-radius: 2px;
        }
        .entry-definition {
          font-size: clamp(1.05rem, 2.5vw, 1.25rem);
          line-height: 1.75;
          color: var(--text-primary);
          font-style: italic;
        }
        .entry-story-block {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 2px;
          padding: 24px;
          position: relative;
        }
        .entry-story-block::before {
          content: '✒';
          position: absolute;
          top: -10px;
          right: 16px;
          background: var(--bg-color);
          padding: 0 6px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .entry-story {
          font-size: 0.95rem;
          line-height: 1.85;
          color: var(--text-secondary);
        }
        .entry-gallery {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: thin;
        }
        .gallery-item {
          flex-shrink: 0;
          width: 220px;
          height: 160px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: transform 0.25s ease;
        }
        .gallery-item:hover { transform: scale(1.02); }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 10px;
          background: linear-gradient(transparent, rgba(0,0,0,0.6));
          font-size: 0.72rem;
          color: #fff;
        }
        .music-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 20px 24px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
        }
        .music-disk {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #2d2a26, #6e6b66, #2d2a26, #6e6b66);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .music-disk-inner {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--bg-color);
        }
        .music-info { flex: 1; }
        .music-title { font-size: 1rem; font-style: italic; margin-bottom: 2px; }
        .music-artist { font-size: 0.78rem; color: var(--text-secondary); }
        .music-play {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: var(--text-primary);
          color: var(--bg-color);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .music-play:hover { background: var(--accent-color); transform: scale(1.05); }
        .timeline { display: flex; flex-direction: column; gap: 0; }
        .timeline-item {
          display: flex;
          gap: 16px;
          position: relative;
        }
        .timeline-item:not(.last) .timeline-line {
          position: absolute;
          left: 7px;
          top: 16px;
          bottom: 0;
          width: 1px;
          background: var(--border-color);
        }
        .timeline-dot {
          width: 15px; height: 15px;
          border-radius: 50%;
          border: 2px solid var(--accent-color);
          background: var(--bg-color);
          flex-shrink: 0;
          margin-top: 2px;
          z-index: 1;
        }
        .timeline-content {
          padding-bottom: 24px;
          cursor: pointer;
          flex: 1;
        }
        .timeline-title { font-size: 0.95rem; font-style: italic; margin-bottom: 2px; }
        .timeline-date { font-size: 0.72rem; color: var(--text-secondary); letter-spacing: 0.04em; }
        .timeline-details {
          margin-top: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
          animation: slideUp 0.3s ease;
        }
        .mood-icons { display: flex; gap: 14px; flex-wrap: wrap; }
        .mood-icon {
          font-size: 1.6rem;
          cursor: default;
          transition: transform 0.2s;
        }
        .mood-icon:hover { transform: scale(1.3) rotate(5deg); }
        .weather-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
        }
        .weather-icon { font-size: 1.8rem; }
        .weather-cond { font-size: 1rem; font-style: italic; }
        .weather-temp { font-size: 0.78rem; color: var(--text-secondary); }
        .locations-mini-map {
          border: 1px solid var(--border-color);
          border-radius: 4px;
          overflow: hidden;
          height: 160px;
        }
        .map-bg {
          width: 100%;
          height: 100%;
          background: var(--card-bg);
          position: relative;
        }
        .map-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.4;
        }
        .map-pin {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transform: translate(-50%, -50%);
        }
        .map-pin-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 0 4px rgba(212, 163, 115, 0.2);
        }
        .map-pin-label {
          font-size: 0.65rem;
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          padding: 2px 6px;
          border-radius: 2px;
          white-space: nowrap;
          color: var(--text-secondary);
        }
        .voice-card {
          padding: 24px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-start;
        }
        .voice-wave {
          display: flex;
          align-items: center;
          gap: 3px;
          width: 100%;
          height: 40px;
        }
        .wave-bar {
          flex: 1;
          background: var(--accent-color);
          border-radius: 2px;
          opacity: 0.5;
          transition: height 0.3s ease;
        }
        .voice-play {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: var(--text-primary);
          color: var(--bg-color);
          border-radius: 2px;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .voice-play:hover { background: var(--accent-color); }
        .voice-hint { font-size: 0.75rem; color: var(--text-secondary); font-style: italic; }
        .related-list { display: flex; flex-direction: column; gap: 8px; }
        .related-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 3px;
          transition: all 0.2s;
          text-align: left;
        }
        .related-item:hover { border-color: var(--accent-color); transform: translateX(4px); }
        .related-word { font-family: var(--font-serif); font-size: 1rem; font-style: italic; }
        .notes-header { display: flex; align-items: center; justify-content: space-between; }
        .notes-toggle { font-size: 0.75rem; color: var(--accent-color); letter-spacing: 0.06em; }
        .notes-area {
          animation: slideUp 0.3s ease;
        }
        .notes-textarea {
          width: 100%;
          min-height: 120px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 2px;
          padding: 16px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--text-primary);
          resize: vertical;
          outline: none;
          line-height: 1.7;
          transition: border-color 0.2s;
        }
        .notes-textarea:focus { border-color: var(--accent-color); }
        .notes-textarea::placeholder { color: var(--text-secondary); font-style: italic; }
        .entry-quote-section {
          padding: 40px 32px;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          text-align: center;
          position: relative;
        }
        .entry-quote-mark {
          font-size: 5rem;
          color: var(--accent-color);
          opacity: 0.2;
          line-height: 0.5;
          margin-bottom: 20px;
          display: block;
        }
        .entry-quote {
          font-size: clamp(0.95rem, 2.5vw, 1.15rem);
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.9;
          max-width: 520px;
          margin: 0 auto;
        }
        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 24px;
          color: #fff;
          font-size: 1.2rem;
          opacity: 0.7;
        }
        .lightbox-close:hover { opacity: 1; }
        .lightbox-img {
          max-width: 100%;
          max-height: 80vh;
          border-radius: 4px;
          object-fit: contain;
        }
        .lightbox-caption {
          margin-top: 14px;
          color: rgba(255,255,255,0.6);
          font-size: 0.82rem;
          letter-spacing: 0.04em;
        }
        /* Drawer */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 100;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .drawer {
          background: var(--bg-color);
          border-top: 1px solid var(--border-color);
          border-radius: 8px 8px 0 0;
          padding: 24px;
          width: 100%;
          max-width: 700px;
          animation: slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .drawer-handle {
          width: 40px;
          height: 4px;
          background: var(--border-color);
          border-radius: 2px;
          margin: 0 auto 20px;
        }
        .drawer-title {
          font-size: 1.4rem;
          margin-bottom: 14px;
          font-style: italic;
          color: var(--text-secondary);
        }
        .drawer-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.95rem;
          color: var(--text-primary);
          transition: color 0.2s;
        }
        .drawer-item:hover { color: var(--accent-color); }
        .drawer-close {
          margin-top: 20px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          align-self: center;
        }
      `}</style>
    </div>
  );
}
