import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onSearch, onNewSnippet }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#13151f',
      borderBottom: '1px solid #1e2235',
      padding: '0 20px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14,
        }}>⟨/⟩</div>
        <span style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0' }}>SnipVault</span>
      </Link>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 400 }}>
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search snippets..."
          style={{
            width: '100%', background: '#1a1d27', border: '1px solid #2d3148',
            borderRadius: 8, padding: '7px 14px', color: '#e2e8f0',
            fontSize: 13, outline: 'none',
          }}
        />
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* New snippet */}
        <button onClick={onNewSnippet} style={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          border: 'none', borderRadius: 8, color: '#fff',
          padding: '7px 14px', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> New Snippet
        </button>

        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMenu((v) => !v)}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              border: 'none', cursor: 'pointer',
              color: '#fff', fontWeight: 600, fontSize: 13,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </button>
          {showMenu && (
            <div style={{
              position: 'absolute', right: 0, top: 40,
              background: '#1a1d27', border: '1px solid #2d3148',
              borderRadius: 10, padding: '6px', minWidth: 160, zIndex: 100,
            }}>
              <div style={{ padding: '8px 12px', fontSize: 13, color: '#94a3b8', borderBottom: '1px solid #2d3148', marginBottom: 4 }}>
                {user?.name}
              </div>
              <button onClick={handleLogout} style={{
                width: '100%', padding: '8px 12px', background: 'none',
                border: 'none', color: '#ef4444', fontSize: 13,
                cursor: 'pointer', textAlign: 'left', borderRadius: 6,
              }}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
