import React from 'react';
import { mockMoods } from '../data/mockData';

export default function MoodCalendar({ onBack }) {
  // Simple grid rendering for moods
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)', padding: '60px 24px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'var(--font-sans)', opacity: 0.5, marginBottom: '40px' }}>← BACK</button>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '10px' }}>Mood Calendar</h1>
      <p style={{ opacity: 0.6, marginBottom: '40px', fontFamily: 'var(--font-sans)' }}>How life changed over the days.</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
        gap: '12px',
        maxWidth: '800px'
      }}>
        {mockMoods.map((m, i) => (
          <div key={i} style={{
            aspectRatio: '1/1',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>{m.mood}</span>
            <span style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '4px' }}>{new Date(m.date).getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
