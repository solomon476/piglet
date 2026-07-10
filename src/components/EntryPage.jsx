import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { ChevronLeft, Play, Pause } from 'lucide-react';

export default function EntryPage({ entry, onBack }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroImage = entry.gallery && entry.gallery.length > 0 ? entry.gallery[0].url : '';

  return (
    <div className="entry-cinematic">
      {/* Fixed Nav */}
      <nav className={`cinematic-nav ${scrolled ? 'scrolled' : ''}`}>
        <button className="back-btn serif" onClick={onBack}>
          <ChevronLeft size={20} strokeWidth={1} />
          Back
        </button>
      </nav>

      {/* Hero Section */}
      <header className="cinematic-hero">
        {heroImage && (
          <>
            <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
            <div className="hero-gradient" />
          </>
        )}
        <div className="hero-content">
          <h1 className="hero-word serif">{entry.word}</h1>
          <p className="hero-pronunciation">{entry.pronunciation}</p>
        </div>
      </header>

      {/* Editorial Content */}
      <main className="cinematic-body">
        <section className="editorial-section animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="editorial-def serif">"{entry.definition}"</p>
        </section>

        <section className="editorial-section animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <p className="editorial-story">{entry.story}</p>
        </section>

        {entry.quote && (
          <section className="editorial-section animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <blockquote className="editorial-quote serif">
              {entry.quote}
            </blockquote>
          </section>
        )}

        {/* Audio Integration - Organic */}
        <div className="audio-narrative animate-slide-up" style={{ animationDelay: '1s' }}>
          {entry.music && entry.music.youtubeId && (
            <div className="audio-whisper">
              <span className="audio-label">Listening to: {entry.music.title}</span>
              <button className="audio-toggle" onClick={() => setIsPlayingMusic(!isPlayingMusic)}>
                {isPlayingMusic ? <Pause size={14} /> : <Play size={14} />}
                {isPlayingMusic ? 'Pause' : 'Play'}
              </button>
              <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                <ReactPlayer 
                  url={`https://www.youtube.com/watch?v=${entry.music.youtubeId}`} 
                  playing={isPlayingMusic} 
                  volume={0.4}
                  width="1px" height="1px"
                  onEnded={() => setIsPlayingMusic(false)}
                  config={{ youtube: { playerVars: { origin: typeof window !== 'undefined' ? window.location.origin : '' } } }}
                />
              </div>
            </div>
          )}

          {entry.voiceId && (
            <div className="audio-whisper mt-4">
              <span className="audio-label">Voice Memory</span>
              <button className="audio-toggle" onClick={() => setIsPlayingVoice(!isPlayingVoice)}>
                {isPlayingVoice ? <Pause size={14} /> : <Play size={14} />}
                {isPlayingVoice ? 'Pause' : 'Play'}
              </button>
              {isPlayingVoice && <div className="whisper-wave" />}
              <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                <ReactPlayer 
                  url={`https://www.youtube.com/watch?v=${entry.voiceId}`} 
                  playing={isPlayingVoice} 
                  volume={0.6}
                  width="1px" height="1px"
                  onEnded={() => setIsPlayingVoice(false)}
                  config={{ youtube: { playerVars: { origin: typeof window !== 'undefined' ? window.location.origin : '' } } }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Gallery Masonry */}
        {entry.gallery && entry.gallery.length > 1 && (
          <section className="editorial-gallery animate-slide-up" style={{ animationDelay: '1.2s' }}>
            {entry.gallery.slice(1).map((img, i) => (
              <figure key={i} className="gallery-figure">
                <img src={img.url} alt={img.caption} loading="lazy" />
                {img.caption && <figcaption className="serif">{img.caption}</figcaption>}
              </figure>
            ))}
          </section>
        )}

        {/* Footnotes / Metadata */}
        <footer className="cinematic-footnotes animate-slide-up" style={{ animationDelay: '1.4s' }}>
          <div className="footnote-grid">
            {entry.weather && (
              <div className="footnote-item">
                <span className="footnote-label">Atmosphere</span>
                <span className="footnote-val serif">{entry.weather.condition}, {entry.weather.temp}</span>
              </div>
            )}
            {entry.mood && entry.mood.length > 0 && (
              <div className="footnote-item">
                <span className="footnote-label">Mood</span>
                <span className="footnote-val serif">{entry.mood.join(', ')}</span>
              </div>
            )}
            {entry.timeline && entry.timeline.length > 0 && (
              <div className="footnote-item">
                <span className="footnote-label">Timeline</span>
                <span className="footnote-val serif">{entry.timeline[entry.timeline.length - 1].date}</span>
              </div>
            )}
            {entry.locations && entry.locations.length > 0 && (
              <div className="footnote-item">
                <span className="footnote-label">Location</span>
                <span className="footnote-val serif">{entry.locations.map(l => l.name).join(', ')}</span>
              </div>
            )}
          </div>
        </footer>
      </main>

      <style>{`
        .entry-cinematic {
          min-height: 100vh;
          background-color: var(--bg-color);
          color: var(--text-primary);
          overflow-x: hidden;
        }

        .cinematic-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 30px 40px;
          z-index: 100;
          display: flex;
          align-items: center;
          transition: all 0.5s ease;
        }
        .cinematic-nav.scrolled {
          background: var(--bg-color);
          padding: 20px 40px;
          box-shadow: var(--shadow-sm);
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          transition: all 0.3s ease;
        }
        .cinematic-nav.scrolled .back-btn {
          color: var(--text-primary);
        }
        .back-btn:hover {
          color: #fff;
          transform: translateX(-4px);
        }
        .cinematic-nav.scrolled .back-btn:hover {
          color: var(--accent-color);
        }

        .cinematic-hero {
          position: relative;
          height: 80vh;
          min-height: 500px;
          display: flex;
          align-items: flex-end;
          padding: 60px;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          z-index: 0;
          animation: slowZoom 20s ease-out forwards;
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 50%, var(--bg-color) 100%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-word {
          font-size: clamp(4rem, 12vw, 8rem);
          color: var(--bg-color); /* Contrast color */
          line-height: 1;
          margin-bottom: 8px;
          animation: slideUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .hero-pronunciation {
          font-size: 1.2rem;
          color: var(--bg-color);
          opacity: 0.6;
          letter-spacing: 0.2em;
          animation: slideUp 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }

        .cinematic-body {
          max-width: 740px;
          margin: 0 auto;
          padding: 80px 24px 120px;
          position: relative;
          z-index: 2;
        }

        .editorial-section {
          margin-bottom: 80px;
          opacity: 0;
        }
        .editorial-def {
          font-size: 2.2rem;
          line-height: 1.4;
          color: var(--text-primary);
          font-style: italic;
        }
        .editorial-story {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-secondary);
          columns: 1;
        }
        @media (min-width: 768px) {
          .editorial-story { columns: 2; column-gap: 60px; }
        }
        
        .editorial-quote {
          font-size: 1.8rem;
          line-height: 1.5;
          text-align: center;
          color: var(--accent-color);
          padding: 0 40px;
        }

        .audio-narrative {
          margin: 60px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          opacity: 0;
        }
        .audio-whisper {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(150, 150, 150, 0.2);
        }
        .audio-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          flex: 1;
        }
        .audio-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
        }
        .audio-toggle:hover { color: var(--accent-color); }
        .whisper-wave {
          width: 20px;
          height: 1px;
          background: var(--accent-color);
          animation: pulseWave 1s infinite alternate;
        }
        @keyframes pulseWave {
          from { transform: scaleX(1); opacity: 0.5; }
          to { transform: scaleX(3); opacity: 1; }
        }

        .editorial-gallery {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 100px;
          opacity: 0;
        }
        .gallery-figure {
          margin: 0;
        }
        .gallery-figure img {
          width: 100%;
          height: auto;
          display: block;
          filter: grayscale(20%);
          transition: filter 0.5s ease;
        }
        .gallery-figure:hover img { filter: grayscale(0%); }
        .gallery-figure figcaption {
          margin-top: 12px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .cinematic-footnotes {
          border-top: 1px solid rgba(150, 150, 150, 0.2);
          padding-top: 60px;
          opacity: 0;
        }
        .footnote-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }
        @media (max-width: 600px) {
          .footnote-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        .footnote-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footnote-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-secondary);
          opacity: 0.6;
        }
        .footnote-val {
          font-size: 1.1rem;
          color: var(--text-primary);
          font-style: italic;
        }
        .mt-4 { margin-top: 16px; }
      `}</style>
    </div>
  );
}
