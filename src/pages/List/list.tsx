import { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { blogListRequest, deleteBlogRequest } from '../../http/api';
import { getColumns } from './config';

const List = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState<BlogType[]>();
  const [originalData, setOriginalData] = useState<BlogType[]>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = () => {
    setLoading(true);
    blogListRequest()
      .then((response) => {
        setListData(response.data.blogList);
        setOriginalData(response.data.blogList);
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

  const searchBlog = ({ searchValue }: { searchValue: string }) => {
    if (!searchValue) {
      return;
    }

    const newArr = originalData?.filter((value) => {
      const keywords = searchValue?.trim().toUpperCase() || '';
      return (
        value.title.toUpperCase().includes(keywords) ||
        value.subTitle.toUpperCase().includes(keywords) ||
        value.category.toUpperCase().includes(keywords) ||
        value.tags.join('').toUpperCase().includes(keywords)
      );
    });
    setListData(newArr);
  };
  const resetBlog = () => {
    if (form.getFieldValue('searchValue')) {
      form.resetFields();
      setListData(originalData);
    }
  };
  const gotoDetail = () => {
    navigate('/detail');
  };
  const gotoEdit = () => {
    navigate('/edit');
  };
  const deleteItem = (blog: BlogType) => {
    Modal.confirm({
      content: '确认删除吗？',
      title: '请确认',
      okText: 'OK',
      cancelText: 'Cancel',
      closable: false,
      onOk: () => {
        deleteBlogRequest({ ids: [blog._id] })
          .then(() => {
            fetchData();
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };

  const columns = getColumns(gotoDetail, gotoEdit, deleteItem);

  return (
    <div className="blog-list">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form form={form} onFinish={searchBlog} layout="inline">
          <Form.Item name="searchValue">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">查询</Button>
          </Form.Item>
          <Form.Item>
            <Button type="dashed" onClick={resetBlog}>
              重置
            </Button>
          </Form.Item>
        </Form>

        <Table
          columns={columns}
          dataSource={listData}
          rowKey={(record) => record._id as string}
          loading={loading}
          pagination={{
            showTotal: (total) => `Total ${total}`,
            showSizeChanger: true,
          }}
        />
      </Space>
    </div>
  );
};

export default List;
