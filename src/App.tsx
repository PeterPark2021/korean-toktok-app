import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { AuthProvider } from './contexts/AuthContext';

// Code-split route pages to optimize initial bundle size
const StudyPage = lazy(() => import('./pages/StudyPage').then(m => ({ default: m.StudyPage })));
const QuizPage = lazy(() => import('./pages/QuizPage').then(m => ({ default: m.QuizPage })));
const ProgressPage = lazy(() => import('./pages/ProgressPage').then(m => ({ default: m.ProgressPage })));
const RoleplayPage = lazy(() => import('./pages/RoleplayPage').then(m => ({ default: m.RoleplayPage })));

function PageLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-xs font-semibold text-slate-500 animate-pulse">학습 데이터를 불러오는 중입니다...</p>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<StudyPage />} />
              <Route path="/study" element={<StudyPage />} />
              <Route path="/roleplay" element={<RoleplayPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
