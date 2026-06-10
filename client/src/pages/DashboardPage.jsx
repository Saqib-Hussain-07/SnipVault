import { useState, useEffect, useMemo } from 'react';
import { useSnippets } from '../context/SnippetContext';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import SnippetList from '../components/snippets/SnippetList';
import SnippetForm from '../components/snippets/SnippetForm';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { snippets, loading, fetchSnippets, addSnippet, editSnippet, removeSnippet } = useSnippets();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchSnippets(); }, [fetchSnippets]);

  // Client-side filtering (search + tag + language)
  const filtered = useMemo(() => {
    return snippets.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      const matchTag = !activeTag || s.tags.includes(activeTag);
      const matchLang = !activeLanguage || s.language === activeLanguage;
      return matchSearch && matchTag && matchLang;
    });
  }, [snippets, search, activeTag, activeLanguage]);

  const handleNew = () => { setEditTarget(null); setModalOpen(true); };
  const handleEdit = (snippet) => { setEditTarget(snippet); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setEditTarget(null); };

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (editTarget) {
        await editSnippet(editTarget._id, data);
        toast.success('Snippet updated');
      } else {
        await addSnippet(data);
        toast.success('Snippet saved');
      }
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this snippet?')) return;
    try {
      await removeSnippet(id);
      toast.success('Snippet deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar onSearch={setSearch} onNewSnippet={handleNew} />
      <div style={{ display: 'flex' }}>
        <Sidebar
          snippets={snippets}
          activeTag={activeTag}
          activeLanguage={activeLanguage}
          onTagClick={setActiveTag}
          onLanguageClick={setActiveLanguage}
        />
        <main style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', minHeight: 'calc(100vh - 56px)' }}>
          {/* Stats bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#e2e8f0' }}>
                {activeTag ? `#${activeTag}` : activeLanguage ? activeLanguage : 'All Snippets'}
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#4b5563' }}>
                {filtered.length} snippet{filtered.length !== 1 ? 's' : ''}
                {search && ` matching "${search}"`}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(activeTag || activeLanguage || search) && (
                <button onClick={() => { setActiveTag(null); setActiveLanguage(null); setSearch(''); }} style={{
                  background: 'none', border: '1px solid #2d3148', borderRadius: 7,
                  color: '#94a3b8', padding: '5px 12px', fontSize: 12, cursor: 'pointer',
                }}>
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <SnippetList snippets={filtered} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
        </main>
      </div>

      <Modal open={modalOpen} onClose={handleClose} title={editTarget ? 'Edit Snippet' : 'New Snippet'} wide>
        <SnippetForm
          initial={editTarget}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          loading={saving}
        />
      </Modal>
    </div>
  );
}
