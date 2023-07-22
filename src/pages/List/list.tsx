import { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteBlogRequest } from '../../http/api';
import { getColumns } from './config';
import { useGetBlogList } from '../../hook/useGetBlogList';

const List = () => {
  const navigate = useNavigate();
  const { blogList, loading, fetchList } = useGetBlogList();
  const [listData, setListData] = useState<BlogType[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setListData(blogList);
  }, [blogList]);

  const searchBlog = ({ searchValue }: { searchValue: string }) => {
    if (!searchValue) {
      return;
    }

    const newArr = blogList?.filter((value) => {
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
      setListData(blogList);
    }
  };
  const gotoDetail = (blog: BlogType) => {
    navigate('/detail', { state: { id: blog._id } });
  };
  const gotoEdit = (blog: BlogType) => {
    navigate('/edit', { state: { id: blog._id } });
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
            fetchList();
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
