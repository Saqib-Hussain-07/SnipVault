import { createContext, useContext, useState, useCallback } from 'react';
import * as snippetApi from '../api/snippetApi';

const SnippetContext = createContext(null);

export function SnippetProvider({ children }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSnippets = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await snippetApi.getSnippets(params);
      setSnippets(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const addSnippet = useCallback(async (data) => {
    const { data: snippet } = await snippetApi.createSnippet(data);
    setSnippets((prev) => [snippet, ...prev]);
    return snippet;
  }, []);

  const editSnippet = useCallback(async (id, data) => {
    const { data: updated } = await snippetApi.updateSnippet(id, data);
    setSnippets((prev) => prev.map((s) => (s._id === id ? updated : s)));
    return updated;
  }, []);

  const removeSnippet = useCallback(async (id) => {
    await snippetApi.deleteSnippet(id);
    setSnippets((prev) => prev.filter((s) => s._id !== id));
  }, []);

  return (
    <SnippetContext.Provider value={{ snippets, loading, fetchSnippets, addSnippet, editSnippet, removeSnippet }}>
      {children}
    </SnippetContext.Provider>
  );
}

export const useSnippets = () => {
  const ctx = useContext(SnippetContext);
  if (!ctx) throw new Error('useSnippets must be used within SnippetProvider');
  return ctx;
};
