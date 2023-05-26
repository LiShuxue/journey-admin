import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login';
import List from '../pages/list';
import Detail from '../pages/detail';
import Edit from '../pages/edit';
import Upload from '../pages/upload';
import User from '../pages/user';

export const routes: RouteObject[] = [
  {
    path: '/',
    loader: () => {
      const token = null;
      if (!token) {
        throw redirect('/login');
      }
      return { token };
    },
    Component: App,
    errorElement: <h1>Somthing went wrong</h1>,
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
    path: '/login',
    Component: Login,
  },
];

const router = createBrowserRouter(routes, {
  basename: '/adminlsx',
});

export default router;
