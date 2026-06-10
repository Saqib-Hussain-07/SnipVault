export default function TagBadge({ tag, onClick, small }) {
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block',
        background: '#1e2235',
        color: '#818cf8',
        border: '1px solid #2d3148',
        borderRadius: 5,
        padding: small ? '1px 6px' : '2px 8px',
        fontSize: small ? 10 : 11,
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      #{tag}
    </span>
  );
}
