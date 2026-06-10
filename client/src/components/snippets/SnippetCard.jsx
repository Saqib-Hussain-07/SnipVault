import { useNavigate } from 'react-router-dom';
import CodeBlock from './CodeBlock';
import TagBadge from './TagBadge';
import CopyButton from '../ui/CopyButton';
import { getLangColor } from '../../utils/languageColors';

export default function SnippetCard({ snippet, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/snippet/${snippet._id}`)}
      style={{
        background: '#13151f',
        border: '1px solid #1e2235',
        borderRadius: 12,
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.15s, transform 0.1s',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3d4268'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e2235'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: getLangColor(snippet.language), flexShrink: 0,
        }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {snippet.title}
        </span>
        {snippet.isPublic && (
          <span style={{ fontSize: 10, background: '#1a2e4a', color: '#60a5fa', border: '1px solid #1e3a5f', borderRadius: 5, padding: '1px 6px' }}>
            public
          </span>
        )}
        <span style={{
          fontSize: 11, background: '#1e2235', color: '#94a3b8',
          border: '1px solid #2d3148', borderRadius: 5, padding: '1px 7px',
          fontFamily: 'JetBrains Mono, monospace', flexShrink: 0,
        }}>
          {snippet.language}
        </span>
      </div>

      {/* Code preview */}
      <div style={{ borderRadius: 8, overflow: 'hidden', fontSize: 12 }} onClick={(e) => e.stopPropagation()}>
        <CodeBlock code={snippet.code} language={snippet.language} maxLines={5} />
      </div>

      {/* Tags + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, flex: 1, flexWrap: 'wrap' }}>
          {snippet.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} tag={tag} small />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <CopyButton text={snippet.code} small />
          <button onClick={() => onEdit(snippet)} style={{
            background: 'none', border: '1px solid #2d3148', borderRadius: 6,
            color: '#94a3b8', padding: '3px 8px', fontSize: 11, cursor: 'pointer',
          }}>Edit</button>
          <button onClick={() => onDelete(snippet._id)} style={{
            background: 'none', border: '1px solid #2d3148', borderRadius: 6,
            color: '#ef4444', padding: '3px 8px', fontSize: 11, cursor: 'pointer',
          }}>Del</button>
        </div>
      </div>
    </div>
  );
}
