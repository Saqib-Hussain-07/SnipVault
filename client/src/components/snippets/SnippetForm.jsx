import { useState } from 'react';
import { LANGUAGES } from '../../utils/languageColors';

const inputStyle = {
  width: '100%', background: '#1a1d27',
  border: '1px solid #2d3148', borderRadius: 8,
  padding: '9px 12px', color: '#e2e8f0',
  fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif',
};

const labelStyle = { fontSize: 12, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 };

export default function SnippetForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    code: initial?.code || '',
    language: initial?.language || 'javascript',
    tags: initial?.tags?.join(', ') || '',
    isPublic: initial?.isPublic || false,
  });

  const [prevInitial, setPrevInitial] = useState(initial);
  if (initial !== prevInitial) {
    setPrevInitial(initial);
    setForm({
      title: initial?.title || '',
      code: initial?.code || '',
      language: initial?.language || 'javascript',
      tags: initial?.tags?.join(', ') || '',
      isPublic: initial?.isPublic || false,
    });
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.code.trim() || !form.language) return;
    onSubmit({
      title: form.title.trim(),
      code: form.code,
      language: form.language,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      isPublic: form.isPublic,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={labelStyle}>Title *</label>
        <input value={form.title} onChange={set('title')} placeholder="e.g. Debounce function" style={inputStyle} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>Language *</label>
          <select value={form.language} onChange={set('language')} style={{ ...inputStyle, cursor: 'pointer' }}>
            {LANGUAGES.map((l) => (
              <option key={l} value={l} style={{ background: '#1a1d27' }}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Tags <span style={{ color: '#4b5563' }}>(comma separated)</span></label>
          <input value={form.tags} onChange={set('tags')} placeholder="react, hooks, utility" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Code *</label>
        <textarea
          value={form.code}
          onChange={set('code')}
          rows={12}
          placeholder="Paste your code here..."
          style={{
            ...inputStyle,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            resize: 'vertical',
            lineHeight: 1.6,
          }}
          required
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#94a3b8' }}>
          <div
            onClick={() => setForm((f) => ({ ...f, isPublic: !f.isPublic }))}
            style={{
              width: 36, height: 20, borderRadius: 10,
              background: form.isPublic ? '#6366f1' : '#2d3148',
              position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              position: 'absolute', top: 2, left: form.isPublic ? 18 : 2,
              width: 16, height: 16, borderRadius: '50%', background: '#fff',
              transition: 'left 0.2s',
            }} />
          </div>
          Make public (shareable link)
        </label>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
        <button type="button" onClick={onCancel} style={{
          padding: '9px 18px', background: 'none', border: '1px solid #2d3148',
          borderRadius: 8, color: '#94a3b8', fontSize: 13, cursor: 'pointer',
        }}>
          Cancel
        </button>
        <button type="submit" disabled={loading} style={{
          padding: '9px 20px',
          background: loading ? '#3730a3' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          border: 'none', borderRadius: 8, color: '#fff',
          fontSize: 13, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? 'Saving…' : (initial ? 'Update Snippet' : 'Save Snippet')}
        </button>
      </div>
    </form>
  );
}
