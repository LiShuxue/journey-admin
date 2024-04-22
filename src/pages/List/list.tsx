import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteBlogRequest } from '../../http/api';
import { getColumns } from './config';
import { useGetBlogList } from '../../hook/useGetBlogList';
import { getBlogDetailRequest } from '../..//http/api';

const List = () => {
  const navigate = useNavigate();
  const { blogList, loading, fetchList } = useGetBlogList();
  const [listData, setListData] = useState<BlogType[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titles, setTitles] = useState<Element[]>([]);

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
        deleteBlogRequest({ id: blog._id })
          .then(() => {
            fetchList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };

  const showTitleOnly = (blog: BlogType) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getBlogDetailRequest(blog._id!).then((res) => {
      const blog = res.data || {};
      // 创建DOMParser对象并将HTML字符串转换为DOM文档
      const parser = new DOMParser();
      const doc = parser.parseFromString(blog.htmlContent, 'text/html');
      // 获取所有标题标签
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const arr = Array.from(headings);
      setTitles(arr);
      setIsModalOpen(true);
    });
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setTitles([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTitles([]);
  };

  const columns = getColumns(gotoDetail, gotoEdit, deleteItem, showTitleOnly);

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

      <Modal title="文章目录" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ fontSize: '70%', overflow: 'scroll', height: '500px' }}>
          {titles.map((ele, index) => {
            // 将DOM元素转换为React元素
            const reactElement = React.createElement(ele.tagName.toLowerCase(), {
              key: `heading-${index}`,
              dangerouslySetInnerHTML: { __html: ele.innerHTML },
            });
            return reactElement;
          })}
        </div>
      </Modal>
    </div>
  );
};

export default List;
