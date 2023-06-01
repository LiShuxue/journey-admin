import { Suspense } from 'react';
import {
  UnorderedListOutlined,
  EditOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useGlobalData } from '../../hook/useGlobalData';

import './index.scss';

const menuItems: MenuProps['items'] = [
  {
    label: '博客列表',
    key: '/list',
    icon: <UnorderedListOutlined />,
  },
  {
    label: '编辑博客',
    key: '/edit',
    icon: <EditOutlined />,
  },
  {
    label: '用户管理',
    key: '/user',
    icon: <UserOutlined />,
  },
  {
    label: '上传文件',
    key: '/uploadfile',
    icon: <UploadOutlined />,
  },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setBlog } = useGlobalData();

  // 默认重定向到list
  if (location.pathname === '/') {
    navigate('/list', { replace: true });
  }

  const onClick: MenuProps['onClick'] = (item) => {
    if (location.pathname === item.key) {
      return;
    }
    if (item.key === '/edit') {
      setBlog({} as BlogType);
    }
    navigate(item.key);
  };

  return (
    <div className="layout">
      <div className="left">
        <Menu onClick={onClick} defaultSelectedKeys={['list']} mode="inline" items={menuItems} />
      </div>
      <div className="right">
        {/* 加载指示器 Suspense 组件需要置于懒加载组件上 */}
        <Suspense fallback={<div>Route Page Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
