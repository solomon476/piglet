import React from 'react';
import { futureLetters } from '../data/mockData';

export default function FutureLetters({ onBack }) {
  const now = new Date();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)', padding: '60px 24px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'var(--font-sans)', opacity: 0.5, marginBottom: '40px' }}>← BACK</button>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '10px' }}>Letters to Future Me</h1>
      <p style={{ opacity: 0.6, marginBottom: '40px', fontFamily: 'var(--font-sans)' }}>Words locked in time.</p>

      <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
        {futureLetters.map(letter => {
          const unlockDate = new Date(letter.unlockDate);
          const isLocked = now < unlockDate;

          return (
            <div key={letter.id} style={{ 
              padding: '24px', 
              border: '1px solid var(--border-color)', 
              borderRadius: '4px',
              opacity: isLocked ? 0.6 : 1,
              position: 'relative'
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '8px' }}>{letter.title}</h3>
              {isLocked ? (
                <div>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '16px' }}>Opens in {Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24 * 365))} Years</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--accent-color)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
                    Locked
                  </div>
                </div>
              ) : (
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', opacity: 0.9 }}>
                  {letter.content}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
