import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { ExposeParam } from 'md-editor-rt';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Form, Input, Button, Radio, Modal, Space } from 'antd';
import { useGetBlogList } from '../../hook/useGetBlogList';
import { useGetBlogDetail } from '../../hook/useGetBlogDetail';
import UploadFile from '../../components/Upload';

import './edit.scss';

const Edit = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const categoryValue = Form.useWatch('category', form);
  const [mdString, setMdString] = useState('');
  const { categoryList, addCategory } = useGetBlogList();
  const { blogDetail, getBlogDetail } = useGetBlogDetail();
  const editorRef = useRef<ExposeParam>();
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    const id = location.state?.id || '';
    getBlogDetail(id);
  }, [location, getBlogDetail]);

  useEffect(() => {
    setMdString(blogDetail.markdownContent);
  }, [blogDetail]);

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
  const onSubmit = (values: BlogType) => {
    console.log(values);
  };

  return (
    <div className="edit-blog">
      <Form form={form} labelAlign="left" onFinish={onSubmit}>
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
        ) : null}

        <Form.Item>
          <Button onClick={showCategory}>添加新类别</Button>
        </Form.Item>

        <Form.Item>
          <UploadFile ossPathByParent={'blog/image/' + categoryValue} disableInput={true} />
        </Form.Item>

        <Form.Item>
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
