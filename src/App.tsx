import React from 'react';
import {
  UnorderedListOutlined,
  EditOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import './App.scss';

const menuItems: MenuProps['items'] = [
  {
    label: '文章列表',
    key: '/list',
    icon: <UnorderedListOutlined />,
  },
  {
    label: '编辑文章',
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

const App: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (item) => {
    navigate(item.key);
  };

  return (
    <div className="app">
      <div className="left">
        <Menu
          onClick={onClick}
          style={{ width: 250 }}
          defaultSelectedKeys={['list']}
          mode="inline"
          items={menuItems}
        />
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
