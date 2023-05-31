import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, redirect, Navigate } from 'react-router-dom';
import { getAuthData } from '../context/auth';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/list" />,
  },
  {
    path: '/',
    Component: Layout,
    errorElement: <ErrorBoundary />,
    loader: () => {
      const auth = getAuthData();
      if (!auth.username || !auth.refreshToken || !auth.accessToken) {
        throw redirect('/loginlsx');
      }
      return { auth };
    },
    children: [
      {
        path: '/list',
        Component: lazy(() => import('../pages/List/list')),
      },
      {
        path: '/detail',
        Component: lazy(() => import('../pages/detail')),
      },
      {
        path: '/edit',
        Component: lazy(() => import('../pages/edit')),
      },
      {
        path: '/uploadfile',
        Component: lazy(() => import('../pages/upload')),
      },
      {
        path: '/user',
        Component: lazy(() => import('../pages/User/user')),
      },
    ],
  },
  {
    path: '/loginlsx',
    Component: lazy(() => import('../pages/Login/login')),
    loader: () => {
      const auth = getAuthData();
      if (auth.username && auth.refreshToken && auth.accessToken) {
        throw redirect('/list');
      }
      return { auth };
    },
  },
  {
    path: '*',
    element: <Navigate to="/list" />,
  },
];

const router = createBrowserRouter(routes, {
  basename: '/adminlsx',
});

export default router;
