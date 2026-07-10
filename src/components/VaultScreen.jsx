import React, { useState } from 'react';
import { vaultEntries } from '../data/mockData';
import { getSettings, saveSettings } from '../utils/storage';

export default function VaultScreen({ onBack }) {
  const [unlocked, setUnlocked] = useState(getSettings().vaultUnlocked);
  const [holding, setHolding] = useState(false);

  const handleHoldStart = () => {
    setHolding(true);
    setTimeout(() => {
      setUnlocked(true);
      const s = getSettings();
      s.vaultUnlocked = true;
      saveSettings(s);
    }, 2000); // 2 second hold
  };

  const handleHoldEnd = () => {
    setHolding(false);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={onBack} style={{ position: 'fixed', top: 40, left: 40, background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', opacity: 0.5 }}>← BACK</button>
        <p style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', opacity: 0.5, marginBottom: '60px' }}>PRIVATE VAULT</p>
        
        <div 
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          style={{
            width: '100px', height: '100px',
            borderRadius: '50%',
            border: `2px solid ${holding ? '#fff' : '#444'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: holding ? 'scale(0.9)' : 'scale(1)',
            boxShadow: holding ? '0 0 30px rgba(255,255,255,0.2)' : 'none'
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={holding ? '#fff' : '#444'} strokeWidth="1.5">
            <path d="M12 11V8a4 4 0 00-8 0v3m16 0V8a4 4 0 00-4-4H8m8 7v10a2 2 0 01-2 2H6a2 2 0 01-2-2V11a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </div>
        <p style={{ marginTop: '30px', fontSize: '0.8rem', opacity: holding ? 1 : 0.3, transition: 'opacity 0.3s' }}>Hold to unlock</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '60px 24px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', opacity: 0.5, marginBottom: '40px' }}>← BACK</button>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '40px' }}>The Vault</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {vaultEntries.map(v => (
          <div key={v.id} style={{ background: '#111', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '10px' }}>{v.title}</h3>
            {v.content && <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{v.content}</p>}
            {v.url && <img src={v.url} alt={v.title} style={{ width: '100%', borderRadius: '4px', marginTop: '10px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
