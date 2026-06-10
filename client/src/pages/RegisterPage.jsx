import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const inputStyle = {
  width: '100%', background: '#1a1d27',
  border: '1px solid #2d3148', borderRadius: 8,
  padding: '11px 14px', color: '#e2e8f0', fontSize: 14, outline: 'none',
};

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { data } = await registerApi(form);
      login(data.token, data.user);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 48, height: 48, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, margin: '0 auto 12px',
          }}>⟨/⟩</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0', margin: 0 }}>SnipVault</h1>
          <p style={{ color: '#4b5563', fontSize: 13, marginTop: 4 }}>Save your best code, forever</p>
        </div>

        <div style={{ background: '#13151f', border: '1px solid #1e2235', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#e2e8f0', margin: '0 0 20px' }}>Create account</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Name</label>
              <input value={form.name} onChange={set('name')} placeholder="Your name" style={inputStyle} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Email</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" style={inputStyle} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Password</label>
              <input type="password" value={form.password} onChange={set('password')} placeholder="Min 6 characters" style={inputStyle} required />
            </div>
            <button type="submit" disabled={loading} style={{
              marginTop: 4,
              background: loading ? '#3730a3' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              border: 'none', borderRadius: 8, color: '#fff',
              padding: '11px', fontSize: 14, fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer', width: '100%',
            }}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#4b5563', fontSize: 13, marginTop: 18 }}>
            Have an account?{' '}
            <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
