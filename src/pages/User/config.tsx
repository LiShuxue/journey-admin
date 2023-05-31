import { Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const getColumns = (
  editUser: (user: UserType) => void,
  deleteUser: (user: UserType) => void
): ColumnsType<UserType> => {
  return [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '操作',
      key: 'action',
      render: (user: UserType) => (
        <Space size="middle">
          <Button onClick={() => editUser(user)}>编辑</Button>
          <Button danger onClick={() => deleteUser(user)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
};
