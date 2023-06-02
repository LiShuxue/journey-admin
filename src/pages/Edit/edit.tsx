import { useEffect, useRef, useState } from 'react';
import type { ExposeParam } from 'md-editor-rt';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Form, Input, Button, Radio, Modal, Space } from 'antd';
import { useGlobalData } from '../../hook/useGlobalData';
import { getBlogDetailRequest } from '../../http/api';
import { useGetBlogList } from '../../hook/useGetBlogList';

import './edit.scss';

const Edit = () => {
  const [mdString, setMdString] = useState('');
  const { categoryList, addCategory } = useGetBlogList();
  const editorRef = useRef<ExposeParam>();
  const { state, setBlog } = useGlobalData();
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    if (state.blog._id) {
      getBlogDetail(state.blog._id);
    } else {
      setBlog({} as BlogType);
    }
  }, []);

  const getBlogDetail = (id: string) => {
    getBlogDetailRequest(id)
      .then((response) => {
        const blog = response.data.blog || {};
        setBlog(blog);
        setMdString(blog.markdownContent);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editorSave = (md: string, html: Promise<string>) => {
    return new Promise((resolve, reject) => {
      html
        .then((str) => {
          resolve({ md, str });
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const showCategory = () => {
    setIsCategoryModalOpen(true);
    setNewCategory('');
  };
  const closeCategory = () => {
    setIsCategoryModalOpen(false);
    setNewCategory('');
  };
  const confirmCategory = () => {
    addCategory(newCategory);
    closeCategory();
  };
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="edit-blog">
      <Form labelAlign="left" onFinish={onSubmit}>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="子标题"
          name="subTitle"
          rules={[{ required: true, message: 'Please input subTitle!' }]}
        >
          <Input />
        </Form.Item>

        {categoryList.length > 0 ? (
          <Form.Item
            label="类别"
            name="category"
            rules={[{ required: true, message: 'Please choose category!' }]}
          >
            <Space>
              <Form.Item>
                <Radio.Group>
                  {categoryList.map((item) => {
                    return (
                      <Radio value={item} key={item}>
                        {item}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button onClick={showCategory}>添加新类别</Button>
              </Form.Item>
            </Space>
          </Form.Item>
        ) : null}

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            发布文章
          </Button>
        </Form.Item>
      </Form>
      <MdEditor
        ref={editorRef}
        modelValue={mdString}
        previewTheme="github"
        codeTheme="github"
        onChange={setMdString}
        onSave={editorSave}
      />

      <Modal
        title="请输入要添加的类别："
        open={isCategoryModalOpen}
        okText="OK"
        cancelText="Cancel"
        onOk={confirmCategory}
        onCancel={closeCategory}
        width={400}
      >
        <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
      </Modal>
    </div>
  );
};

export default Edit;
