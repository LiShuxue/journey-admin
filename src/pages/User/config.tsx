import { Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const getColumns = (
  editUser: (user: UserDataType) => void,
  deleteUser: (user: UserDataType) => void
): ColumnsType<UserDataType> => {
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
      render: (user: UserDataType) => (
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
