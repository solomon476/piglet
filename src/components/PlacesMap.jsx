import React from 'react';
import { entries } from '../data/mockData';

export default function PlacesMap({ onBack, onSelectEntry }) {
  // Simple abstract grid-based map since we don't have MapBox
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)', position: 'relative', overflow: 'hidden' }}>
      <button onClick={onBack} style={{ position: 'absolute', top: 40, left: 40, zIndex: 10, background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'var(--font-sans)', opacity: 0.5 }}>← BACK</button>
      
      {/* Grid Background */}
      <div style={{ 
        position: 'absolute', inset: 0, opacity: 0.05, 
        backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }} />

      <h1 style={{ position: 'absolute', top: 40, right: 40, fontFamily: 'var(--font-serif)', fontSize: '2.5rem', margin: 0, opacity: 0.8 }}>Places</h1>

      <div style={{ position: 'absolute', inset: '100px 40px 40px 40px' }}>
        {entries.map(entry => {
          if (!entry.locations || entry.locations.length === 0) return null;
          return entry.locations.map((loc, i) => {
            // Abstract coordinates to %
            const x = Math.abs(loc.coordinates.lng) % 100;
            const y = Math.abs(loc.coordinates.lat * 10) % 100;
            return (
              <div 
                key={`${entry.id}-${i}`}
                onClick={() => onSelectEntry(entry.id)}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-serif)', whiteSpace: 'nowrap' }}>{loc.name}</span>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
