import { lazy } from 'react';
import {
  createBrowserRouter,
  redirect,
  RouteObject,
  useRouteError,
  Navigate,
} from 'react-router-dom';

import Layout from '../pages/layout';

const Login = lazy(() => import('../pages/login'));
const List = lazy(() => import('../pages/list'));
const Detail = lazy(() => import('../pages/detail'));
const Edit = lazy(() => import('../pages/edit'));
const Upload = lazy(() => import('../pages/upload'));
const User = lazy(() => import('../pages/user'));

// 错误边界
const ErrorBoundary = () => {
  const err = useRouteError() as any;
  return (
    <div>
      <h1>Somthing went wrong!</h1>
      <p>{err.message}</p>
    </div>
  );
};

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
      const token = null;
      if (!token) {
        throw redirect('/loginlsx');
      }
      return { token };
    },
    children: [
      {
        path: '/list',
        Component: List,
      },
      {
        path: '/detail',
        Component: Detail,
      },
      {
        path: '/edit',
        Component: Edit,
      },
      {
        path: '/uploadfile',
        Component: Upload,
      },
      {
        path: '/user',
        Component: User,
      },
    ],
  },
  {
    path: '/loginlsx',
    Component: Login,
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
