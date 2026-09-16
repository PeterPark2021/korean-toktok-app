import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { StudyPage } from './pages/StudyPage';
import { QuizPage } from './pages/QuizPage';
import { ProgressPage } from './pages/ProgressPage';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<StudyPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
