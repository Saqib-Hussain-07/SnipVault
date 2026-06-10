import { useClipboard } from '../../hooks/useClipboard';

export default function CopyButton({ text, small }) {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <button
      onClick={(e) => { e.stopPropagation(); copyToClipboard(text); }}
      title="Copy to clipboard"
      style={{
        background: copied ? '#1a3a2a' : '#1a1d27',
        border: `1px solid ${copied ? '#1d9e75' : '#2d3148'}`,
        borderRadius: 6,
        color: copied ? '#4ade80' : '#94a3b8',
        padding: small ? '3px 8px' : '5px 12px',
        fontSize: small ? 11 : 12,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 5,
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.15s',
        flexShrink: 0,
      }}
    >
      {copied ? '✓ Copied' : '⧉ Copy'}
    </button>
  );
}
