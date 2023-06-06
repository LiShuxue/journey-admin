import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Form, Input, Button, Radio, Modal, Space } from 'antd';
import { useGetBlogList } from '../../hook/useGetBlogList';
import { useGetBlogDetail } from '../../hook/useGetBlogDetail';
import UploadFileComp from '../../components/Upload';
import Tags from './tags';
import { updateBlogRequest, publishBlogRequest } from '../../http/api';

import './edit.scss';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const categoryValue = Form.useWatch('category', form) || '';
  const [mdString, setMdString] = useState('');
  const [htmlString, setHtmlString] = useState('');
  const { categoryList, addCategory } = useGetBlogList();
  const { blogDetail, getBlogDetail } = useGetBlogDetail();
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const id = location.state?.id || '';
    getBlogDetail(id);
  }, [location, getBlogDetail]);

  useEffect(() => {
    if (Object.keys(blogDetail).length > 0) {
      form.setFieldsValue({
        title: blogDetail.title,
        subTitle: blogDetail.subTitle,
        name: blogDetail.image.name,
        url: blogDetail.image.url,
        isOriginal: blogDetail.isOriginal,
        category: blogDetail.category,
      });
      setMdString(blogDetail.markdownContent);
      setTags(blogDetail.tags);
    }
  }, [blogDetail, form]);

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
  const onSubmit = (formValues: BlogType) => {
    if (blogDetail._id) {
      // 修改目标文章
      updateBlogRequest({
        _id: blogDetail._id,
        title: formValues.title,
        subTitle: formValues.subTitle,
        image: {
          name: formValues.name as string,
          url: formValues.url as string,
        },
        htmlContent: htmlString,
        markdownContent: mdString,
        isOriginal: formValues.isOriginal,
        category: formValues.category,
        tags: tags,
      })
        .then(() => {
          navigate('/list', { replace: true });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      // 发布新的文章
      publishBlogRequest({
        title: formValues.title,
        subTitle: formValues.subTitle,
        image: {
          name: formValues.name as string,
          url: formValues.url as string,
        },
        htmlContent: htmlString,
        markdownContent: mdString,
        isOriginal: formValues.isOriginal,
        category: formValues.category,
        tags: tags,
      })
        .then(() => {
          navigate('/list', { replace: true });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="edit-blog">
      <Form form={form} labelAlign="left" onFinish={onSubmit}>
        <Space size="large" className="title">
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
        </Space>

        <Form.Item label="类别" className="self-label-required">
          {categoryList.length > 0 ? (
            <Form.Item
              noStyle
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
          <Form.Item noStyle>
            <Button onClick={showCategory}>添加新类别</Button>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <UploadFileComp ossPathByParent={`blog/image/${categoryValue}`} disableInput={true} />
        </Form.Item>

        <Space size="large" className="title">
          <Form.Item
            label="主图name"
            name="name"
            rules={[{ required: true, message: 'Please input image name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="主图url"
            name="url"
            rules={[{ required: true, message: 'Please input image url!' }]}
          >
            <Input />
          </Form.Item>
        </Space>

        <Form.Item>
          <MdEditor
            modelValue={mdString}
            previewTheme="github"
            codeTheme="github"
            onChange={setMdString}
            onHtmlChanged={setHtmlString}
          />
        </Form.Item>

        <Form.Item label="标签" className="self-label-required">
          <Tags tags={tags} onChange={(tags: string[]) => setTags(tags)} />
        </Form.Item>

        <Form.Item
          label="原创"
          name="isOriginal"
          rules={[{ required: true, message: 'Please choose isOriginal!' }]}
        >
          <Radio.Group>
            <Radio value={true} key="1">
              原创
            </Radio>
            <Radio value={false} key="2">
              转载
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {blogDetail._id ? '修改文章' : '发布文章'}
          </Button>
        </Form.Item>
      </Form>

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
