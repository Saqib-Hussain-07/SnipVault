import SnippetCard from './SnippetCard';

export default function SnippetList({ snippets, loading, onEdit, onDelete }) {
  if (loading) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          background: '#13151f', border: '1px solid #1e2235', borderRadius: 12,
          height: 180, animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      ))}
    </div>
  );

  if (!snippets.length) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#4b5563' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>⟨/⟩</div>
      <div style={{ fontSize: 16, fontWeight: 500, color: '#6b7280', marginBottom: 8 }}>No snippets yet</div>
      <div style={{ fontSize: 13 }}>Click "New Snippet" to save your first code snippet</div>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
      {snippets.map((s) => (
        <SnippetCard key={s._id} snippet={s} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
