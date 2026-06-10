import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children, wide }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#13151f',
          border: '1px solid #2d3148',
          borderRadius: 14,
          width: '100%',
          maxWidth: wide ? 720 : 520,
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#e2e8f0' }}>{title}</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            color: '#94a3b8', fontSize: 20, cursor: 'pointer', lineHeight: 1,
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
