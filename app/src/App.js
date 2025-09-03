import { Routes, Route, Navigate } from "react-router-dom";

// import './App.css';

import Auth from './components/Auth';
import Resumes from './components/Resumes';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/resumes" replace />} />
      <Route path="/auth" element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      } />
      <Route path="/resumes" element={
        <PrivateRoute>
          <Resumes />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
