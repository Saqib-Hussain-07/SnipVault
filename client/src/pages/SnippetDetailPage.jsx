import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSnippet } from '../api/snippetApi';
import { useSnippets } from '../context/SnippetContext';
import CodeBlock from '../components/snippets/CodeBlock';
import TagBadge from '../components/snippets/TagBadge';
import CopyButton from '../components/ui/CopyButton';
import Modal from '../components/ui/Modal';
import SnippetForm from '../components/snippets/SnippetForm';
import { getLangColor } from '../utils/languageColors';
import { useClipboard } from '../hooks/useClipboard';
import toast from 'react-hot-toast';

export default function SnippetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editSnippet, removeSnippet } = useSnippets();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { copied: linkCopied, copyToClipboard: copyLink } = useClipboard();

  useEffect(() => {
    getSnippet(id)
      .then(({ data }) => setSnippet(data))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleEdit = async (data) => {
    setSaving(true);
    try {
      const updated = await editSnippet(id, data);
      setSnippet(updated);
      setEditOpen(false);
      toast.success('Snippet updated');
    } catch { toast.error('Update failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this snippet?')) return;
    await removeSnippet(id);
    toast.success('Snippet deleted');
    navigate('/dashboard');
  };

  const handleCopyLink = () => {
    if (snippet?.shareId) {
      copyLink(`${window.location.origin}/share/${snippet.shareId}`);
      toast.success('Share link copied!');
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#4b5563' }}>
      Loading…
    </div>
  );

  if (!snippet) return null;

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: 900, margin: '0 auto' }}>
      {/* Back */}
      <button onClick={() => navigate('/dashboard')} style={{
        background: 'none', border: 'none', color: '#6366f1',
        cursor: 'pointer', fontSize: 13, marginBottom: 20, padding: 0,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        ← Back to dashboard
      </button>

      <div style={{ background: '#13151f', border: '1px solid #1e2235', borderRadius: 16, padding: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%', background: getLangColor(snippet.language),
            flexShrink: 0, marginTop: 5,
          }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#e2e8f0' }}>{snippet.title}</h1>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{
                fontSize: 11, background: '#1e2235', color: '#94a3b8',
                border: '1px solid #2d3148', borderRadius: 5, padding: '2px 8px',
                fontFamily: 'JetBrains Mono, monospace',
              }}>{snippet.language}</span>
              {snippet.isPublic && (
                <span style={{ fontSize: 11, background: '#1a2e4a', color: '#60a5fa', border: '1px solid #1e3a5f', borderRadius: 5, padding: '2px 8px' }}>
                  🌐 Public
                </span>
              )}
              {snippet.tags.map((t) => <TagBadge key={t} tag={t} />)}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <CopyButton text={snippet.code} />
            {snippet.isPublic && snippet.shareId && (
              <button onClick={handleCopyLink} style={{
                background: linkCopied ? '#1a3a2a' : '#1a1d27',
                border: `1px solid ${linkCopied ? '#1d9e75' : '#2d3148'}`,
                borderRadius: 6, color: linkCopied ? '#4ade80' : '#94a3b8',
                padding: '5px 12px', fontSize: 12, cursor: 'pointer',
              }}>
                {linkCopied ? '✓ Link copied' : '🔗 Copy link'}
              </button>
            )}
            <button onClick={() => setEditOpen(true)} style={{
              background: 'none', border: '1px solid #2d3148', borderRadius: 6,
              color: '#94a3b8', padding: '5px 12px', fontSize: 12, cursor: 'pointer',
            }}>Edit</button>
            <button onClick={handleDelete} style={{
              background: 'none', border: '1px solid #2d3148', borderRadius: 6,
              color: '#ef4444', padding: '5px 12px', fontSize: 12, cursor: 'pointer',
            }}>Delete</button>
          </div>
        </div>

        {/* Code */}
        <div style={{ borderRadius: 10, overflow: 'hidden' }}>
          <CodeBlock code={snippet.code} language={snippet.language} />
        </div>

        <p style={{ margin: '14px 0 0', fontSize: 12, color: '#4b5563' }}>
          Last updated {new Date(snippet.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Snippet" wide>
        <SnippetForm initial={snippet} onSubmit={handleEdit} onCancel={() => setEditOpen(false)} loading={saving} />
      </Modal>
    </div>
  );
}
