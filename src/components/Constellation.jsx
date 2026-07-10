import React, { useState, useEffect } from 'react';
import { entries } from '../data/mockData';

export default function Constellation({ onSelectEntry, onBack }) {
  const [nodes, setNodes] = useState([]);
  
  useEffect(() => {
    // Generate pseudo-random positions for nodes
    const generated = entries.map((e, i) => ({
      ...e,
      x: 15 + Math.random() * 70, // % based
      y: 15 + Math.random() * 70, // % based
    }));
    setNodes(generated);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bg-color)',
      color: 'var(--text-primary)',
      overflow: 'hidden',
      animation: 'fadeIn 1s ease'
    }}>
      <button 
        onClick={onBack}
        style={{ position: 'absolute', top: 40, left: 40, zIndex: 10, background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}
      >
        ← BACK
      </button>

      <div style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%">
          {/* Draw lines first */}
          {nodes.map(node => (
            node.related.map(relId => {
              const target = nodes.find(n => n.id === relId);
              if (!target) return null;
              return (
                <line 
                  key={`${node.id}-${relId}`}
                  x1={`${node.x}%`} y1={`${node.y}%`}
                  x2={`${target.x}%`} y2={`${target.y}%`}
                  stroke="var(--text-primary)"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                />
              );
            })
          ))}

          {/* Draw stars and labels */}
          {nodes.map(node => (
            <g 
              key={node.id} 
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => onSelectEntry(node.id)}
            >
              <circle cx={`${node.x}%`} cy={`${node.y}%`} r="4" fill="var(--accent-color)" />
              <text 
                x={`${node.x}%`} y={`${node.y - 2}%`} 
                fill="var(--text-primary)" 
                textAnchor="middle"
                fontSize="0.9rem"
                fontFamily="var(--font-serif)"
                style={{ opacity: 0.8 }}
              >
                {node.word}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
