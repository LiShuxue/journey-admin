import { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input } from 'antd';
import SHA256 from 'crypto-js/sha256';
import http from '../../http';
import API from '../../http/api';
import { getColumns } from './config';
import type { UserDataType } from './config';

const User = () => {
  const [userData, setUserData] = useState<UserDataType[]>();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = () => {
    setLoading(true);
    http
      .get(API.requireAuth.userList)
      .then((response) => {
        setUserData(response.data.userList);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAddUser = () => {
    setTitle('新增');
    setIsModalOpen(true);
    // 使用form.setFieldsValue去重置initialValues
    form.setFieldsValue({
      username: '',
      password: '',
      _id: '',
    });
  };
  const showEditUser = (user: UserDataType) => {
    setTitle('编辑');
    setIsModalOpen(true);
    form.setFieldsValue({
      username: user.username,
      password: user.password,
      _id: user._id,
    });
  };
  const closeModal = () => {
    setTitle('');
    setIsModalOpen(false);
    form.setFieldsValue({
      username: '',
      password: '',
      _id: '',
    });
  };

  const submit = async (user: UserDataType) => {
    try {
      if (title === '新增') {
        await http.post(API.notRequireAuth.register, {
          username: user.username,
          password: SHA256(user.password).toString(),
        });
      } else if (title === '编辑') {
        await http.post(API.requireAuth.updateUser, {
          user: {
            _id: user._id,
            username: user.username,
            password: SHA256(user.password).toString(),
          },
        });
      }
      closeModal();
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };
  const confirmModal = async () => {
    try {
      const user = await form.validateFields();
      Modal.confirm({
        content: '确认提交吗？',
        title: '请确认',
        okText: 'OK',
        cancelText: 'Cancel',
        closable: false,
        onOk: () => {
          submit(user);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = (user: UserDataType) => {
    Modal.confirm({
      content: '确认删除吗？',
      title: '请确认',
      okText: 'OK',
      cancelText: 'Cancel',
      closable: false,
      onOk: () => {
        http
          .post(API.requireAuth.deleteUser, { ids: [user._id] })
          .then(() => {
            fetchData();
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };

  const columns = getColumns(showEditUser, deleteUser);

  return (
    <div className="user">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Button type="primary" onClick={showAddUser}>
          新增
        </Button>

        <Table
          columns={columns}
          dataSource={userData}
          rowKey={(record) => record._id}
          loading={loading}
        />
      </Space>

      <Modal
        title={title}
        open={isModalOpen}
        okText="确认"
        onOk={confirmModal}
        cancelText="取消"
        onCancel={closeModal}
      >
        {/* 使用initialValues，而不是每个input使用一个state，或者每个input的defaultValue */}
        <Form
          form={form}
          initialValues={{ username: '', password: '', _id: '' }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          {title === '编辑' && (
            <Form.Item label="id" name="_id">
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
