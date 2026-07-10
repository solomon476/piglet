import React from 'react';
import { entries } from '../data/mockData';

export default function CountdownScreen({ entryId, onContinue }) {
  const entry = entries.find(e => e.id === entryId);
  
  if (!entry || !entry.targetDate) {
    return <div onClick={onContinue}>Loading...</div>;
  }

  const target = new Date(entry.targetDate);
  const now = new Date();
  const diffTime = target - now;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div 
      onClick={onContinue}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        animation: 'fadeIn 2s ease'
      }}
    >
      <p style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '20px' }}>
        Next Chapter
      </p>
      
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', margin: '0 0 40px 0' }}>
        {entry.targetLabel || entry.word}
      </h1>
      
      {daysLeft > 0 ? (
        <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>
          {daysLeft} Days Left
        </p>
      ) : (
        <p style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>
          Today 🌸
        </p>
      )}
      
      <p style={{ position: 'absolute', bottom: 40, opacity: 0.3, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        Tap anywhere to continue
      </p>
    </div>
  );
}
