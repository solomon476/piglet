import React from 'react';

export default function LegacyScreen({ daysAway, onContinue }) {
  const years = Math.floor(daysAway / 365);
  const remainingDays = daysAway % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-primary)',
      padding: '40px',
      textAlign: 'center',
      animation: 'fadeIn 2s ease'
    }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '40px' }}>
        Welcome back.
      </h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.8, maxWidth: '500px' }}>
        It's been <strong>{years > 0 && `${years} years, `}{months > 0 && `${months} months, `}{days} days</strong> since your last entry.
      </p>
      
      <button 
        onClick={onContinue}
        style={{
          marginTop: '60px',
          padding: '16px 40px',
          background: 'var(--text-primary)',
          color: 'var(--bg-color)',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          transition: 'all 0.3s ease'
        }}
      >
        Ready to continue your story?
      </button>
    </div>
  );
}
