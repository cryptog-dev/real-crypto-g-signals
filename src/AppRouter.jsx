import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import BlogDetail from './pages/BlogDetail';
import ErrorBoundary from './components/ui/ErrorBoundary';

const AppRouter = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRouter;
