import { getLangColor } from '../../utils/languageColors';

export default function Sidebar({ snippets, activeTag, activeLanguage, onTagClick, onLanguageClick }) {
  // Collect all tags from snippets
  const allTags = [...new Set(snippets.flatMap((s) => s.tags))].sort();
  // Collect used languages
  const usedLangs = [...new Set(snippets.map((s) => s.language))].sort();

  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: '#4b5563',
    textTransform: 'uppercase', letterSpacing: '0.07em',
    marginBottom: 8, marginTop: 20,
  };

  const itemStyle = (active) => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '6px 10px', borderRadius: 7, cursor: 'pointer',
    fontSize: 13, color: active ? '#e2e8f0' : '#94a3b8',
    background: active ? '#1e2235' : 'transparent',
    border: 'none', width: '100%', textAlign: 'left',
  });

  return (
    <aside style={{
      width: 200, flexShrink: 0,
      background: '#13151f', borderRight: '1px solid #1e2235',
      padding: '16px 10px', height: 'calc(100vh - 56px)',
      overflowY: 'auto', position: 'sticky', top: 56,
    }}>
      <button style={itemStyle(!activeTag && !activeLanguage)} onClick={() => { onTagClick(null); onLanguageClick(null); }}>
        <span style={{ fontSize: 15 }}>⊞</span> All Snippets
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4b5563' }}>{snippets.length}</span>
      </button>
      <button style={itemStyle(false)} onClick={() => { onTagClick(null); onLanguageClick(null); /* filter public */ }}>
        <span style={{ fontSize: 15 }}>🌐</span> Public
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4b5563' }}>{snippets.filter(s => s.isPublic).length}</span>
      </button>

      {usedLangs.length > 0 && (
        <>
          <div style={labelStyle}>Languages</div>
          {usedLangs.map((lang) => (
            <button key={lang} style={itemStyle(activeLanguage === lang)} onClick={() => onLanguageClick(activeLanguage === lang ? null : lang)}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: getLangColor(lang), flexShrink: 0,
              }} />
              <span style={{ textTransform: 'capitalize' }}>{lang}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4b5563' }}>
                {snippets.filter(s => s.language === lang).length}
              </span>
            </button>
          ))}
        </>
      )}

      {allTags.length > 0 && (
        <>
          <div style={labelStyle}>Tags</div>
          {allTags.map((tag) => (
            <button key={tag} style={itemStyle(activeTag === tag)} onClick={() => onTagClick(activeTag === tag ? null : tag)}>
              <span style={{ color: '#6366f1' }}>#</span>
              {tag}
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4b5563' }}>
                {snippets.filter(s => s.tags.includes(tag)).length}
              </span>
            </button>
          ))}
        </>
      )}
    </aside>
  );
}
