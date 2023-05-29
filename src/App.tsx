import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './auth';
import Layout from './pages/layout';

const Login = lazy(() => import('./pages/login'));
const List = lazy(() => import('./pages/list'));
const Detail = lazy(() => import('./pages/detail'));
const Edit = lazy(() => import('./pages/edit'));
const Upload = lazy(() => import('./pages/upload'));
const User = lazy(() => import('./pages/user'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="list" element={<List />} />
          <Route path="detail" element={<Detail />} />
          <Route path="edit" element={<Edit />} />
          <Route path="uploadfile" element={<Upload />} />
          <Route path="user" element={<User />} />
        </Route>
        <Route path="/loginlsx" element={<Login />} />
        <Route path="*" element={<Navigate to="/list" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
