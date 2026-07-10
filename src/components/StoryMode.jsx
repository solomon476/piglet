import React, { useState } from 'react';
import { entries } from '../data/mockData';

export default function StoryMode({ onBack }) {
  const [chapter, setChapter] = useState(0);

  const nextChapter = () => {
    if (chapter < entries.length - 1) setChapter(c => c + 1);
  };

  const prevChapter = () => {
    if (chapter > 0) setChapter(c => c - 1);
  };

  const current = entries[chapter];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-primary)',
      padding: '60px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'fadeIn 1s ease'
    }}>
      <button 
        onClick={onBack}
        style={{ position: 'fixed', top: 40, left: 40, background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}
      >
        ← BACK
      </button>

      <div style={{ maxWidth: '600px', width: '100%', marginTop: '10vh' }}>
        <p style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '20px' }}>
          Chapter {chapter + 1}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '40px' }}>
          {current.word}
        </h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', lineHeight: '2', opacity: 0.8 }}>
          {current.story}
        </p>

        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
          <button onClick={prevChapter} disabled={chapter === 0} style={{ opacity: chapter === 0 ? 0.3 : 1, background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            ← Previous
          </button>
          <button onClick={nextChapter} disabled={chapter === entries.length - 1} style={{ opacity: chapter === entries.length - 1 ? 0.3 : 1, background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            Next Chapter →
          </button>
        </div>
      </div>
    </div>
  );
}
