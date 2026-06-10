import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SnippetProvider } from './context/SnippetContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SnippetDetailPage from './pages/SnippetDetailPage';
import PublicSnippetPage from './pages/PublicSnippetPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SnippetProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: '#1a1d27', color: '#e2e8f0', border: '1px solid #2d3148', fontSize: 13 },
              success: { iconTheme: { primary: '#4ade80', secondary: '#1a1d27' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#1a1d27' } },
            }}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/share/:shareId" element={<PublicSnippetPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/snippet/:id" element={<ProtectedRoute><SnippetDetailPage /></ProtectedRoute>} />
          </Routes>
        </SnippetProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
