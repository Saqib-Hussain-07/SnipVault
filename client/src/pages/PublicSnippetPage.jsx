import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicSnippet } from '../api/snippetApi';
import CodeBlock from '../components/snippets/CodeBlock';
import TagBadge from '../components/snippets/TagBadge';
import CopyButton from '../components/ui/CopyButton';
import { getLangColor } from '../utils/languageColors';

export default function PublicSnippetPage() {
  const { shareId } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPublicSnippet(shareId)
      .then(({ data }) => setSnippet(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [shareId]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#4b5563' }}>Loading…</div>
  );

  if (notFound) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 12 }}>
      <div style={{ fontSize: 40 }}>⟨/⟩</div>
      <h2 style={{ color: '#e2e8f0', margin: 0 }}>Snippet not found</h2>
      <p style={{ color: '#4b5563', fontSize: 13 }}>This snippet may have been deleted or made private.</p>
      <Link to="/login" style={{ color: '#818cf8', fontSize: 13 }}>Go to SnipVault →</Link>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px', maxWidth: 860, margin: '0 auto' }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
        <div style={{
          width: 28, height: 28, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
        }}>⟨/⟩</div>
        <Link to="/login" style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0', textDecoration: 'none' }}>SnipVault</Link>
        <span style={{ fontSize: 12, color: '#4b5563', marginLeft: 4 }}>· shared snippet</span>
      </div>

      <div style={{ background: '#13151f', border: '1px solid #1e2235', borderRadius: 16, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: getLangColor(snippet.language), flexShrink: 0, marginTop: 5,
          }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#e2e8f0' }}>{snippet.title}</h1>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 11, background: '#1e2235', color: '#94a3b8',
                border: '1px solid #2d3148', borderRadius: 5, padding: '2px 8px',
                fontFamily: 'JetBrains Mono, monospace',
              }}>{snippet.language}</span>
              {snippet.tags.map((t) => <TagBadge key={t} tag={t} />)}
            </div>
          </div>
          <CopyButton text={snippet.code} />
        </div>

        <div style={{ borderRadius: 10, overflow: 'hidden' }}>
          <CodeBlock code={snippet.code} language={snippet.language} />
        </div>
      </div>

      <p style={{ textAlign: 'center', color: '#4b5563', fontSize: 12, marginTop: 24 }}>
        Shared via <Link to="/register" style={{ color: '#818cf8', textDecoration: 'none' }}>SnipVault</Link> — save your own snippets for free
      </p>
    </div>
  );
}
