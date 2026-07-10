import React, { useEffect, useState } from 'react';

export default function OpeningScreen({ onOpen, isTransitioning }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="screen-content opening-screen" style={{ opacity: visible ? 1 : 0 }}>
      {/* Background grain/texture overlay */}
      <div className="opening-grain" />

      {/* Decorative lines */}
      <div className="opening-lines">
        <div className="opening-line top" />
        <div className="opening-line bottom" />
      </div>

      {/* Pig silhouette */}
      <div className="pig-silhouette">
        <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <ellipse cx="100" cy="95" rx="52" ry="42" />
          <ellipse cx="60" cy="78" rx="22" ry="18" />
          <ellipse cx="58" cy="72" rx="10" ry="8" />
          <circle cx="54" cy="72" r="2.5" fill="var(--bg-color)" />
          <circle cx="62" cy="72" r="2.5" fill="var(--bg-color)" />
          <ellipse cx="135" cy="85" rx="12" ry="9" />
          <ellipse cx="80" cy="130" rx="7" ry="10" />
          <ellipse cx="96" cy="133" rx="7" ry="10" />
          <ellipse cx="113" cy="133" rx="7" ry="10" />
          <ellipse cx="126" cy="129" rx="7" ry="10" />
          <path d="M138 88 Q155 72 150 58 Q148 62 145 64" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Content */}
      <div className="opening-content">
        <div className="opening-rule" />
        <h1 className="opening-title">Piglet Dictionary</h1>
        <div className="opening-rule thin" />
        <p className="opening-subtitle">Every word has a story.</p>
        <div className="opening-rule" />
      </div>

      {/* Button */}
      <div className="opening-button-wrap">
        <button
          className="opening-button"
          onClick={onOpen}
          disabled={isTransitioning}
        >
          <span>Open</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="opening-hint">Est. 2026</p>
      </div>

      <style>{`
        .opening-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-color);
          transition: opacity 1.2s ease;
          position: relative;
          overflow: hidden;
          padding: 40px 20px;
        }
        .opening-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }
        .opening-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .opening-line {
          position: absolute;
          left: 60px;
          right: 60px;
          height: 1px;
          background: var(--border-color);
        }
        .opening-line.top { top: 40px; }
        .opening-line.bottom { bottom: 40px; }
        .pig-silhouette {
          color: var(--border-color);
          width: 120px;
          height: auto;
          margin-bottom: 32px;
          opacity: 0.45;
          animation: fadeIn 2s ease forwards;
        }
        .opening-content {
          text-align: center;
          animation: slideUp 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          margin-bottom: 52px;
        }
        .opening-rule {
          width: 120px;
          height: 1px;
          background: var(--accent-color);
          margin: 16px auto;
          opacity: 0.5;
        }
        .opening-rule.thin {
          width: 60px;
          opacity: 0.25;
        }
        .opening-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 6vw, 3.8rem);
          font-weight: 400;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 12px 0;
        }
        .opening-subtitle {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--text-secondary);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 300;
        }
        .opening-button-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: fadeIn 2s ease 0.8s both;
        }
        .opening-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 40px;
          background: var(--text-primary);
          color: var(--bg-color);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          border-radius: 2px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .opening-button:hover:not(:disabled) {
          background: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .opening-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .opening-hint {
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.12em;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
