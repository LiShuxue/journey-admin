import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { MdPreview, MdCatalog } from 'md-editor-rt';
import type { TocItem } from 'md-editor-rt/lib/types/MdCatalog';
import 'md-editor-rt/lib/style.css';
import { useGetBlogDetail } from '../../hook/useGetBlogDetail';
import { deleteBlogRequest } from '../../http/api';
import { usePreNextBlog } from '../../hook/usePreNextBlog';
import ArticleComments from './ArticleComments';

import './detail.scss';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogDetail, getBlogDetail } = useGetBlogDetail();
  const [id] = useState('preview-blog');
  const [scrollElement] = useState('.right');
  const { preBlog, nextBlog, getPreNextBlog } = usePreNextBlog();

  useEffect(() => {
    const id = location.state?.id || '';
    getBlogDetail(id);
  }, [location, getBlogDetail]);

  useEffect(() => {
    getPreNextBlog(blogDetail._id as string, blogDetail.category);
  }, [blogDetail, getPreNextBlog]);

  const onCatalogClick = (e: React.MouseEvent, t: TocItem) => {
    console.log(e);
    navigate(`/detail#${t.text}`, { replace: true });
  };

  const editBlog = () => {
    navigate('/edit', { state: { id: blogDetail._id } });
  };

  const deleteBlog = () => {
    Modal.confirm({
      content: '确认删除吗？',
      title: '请确认',
      okText: 'OK',
      cancelText: 'Cancel',
      closable: false,
      onOk: () => {
        deleteBlogRequest({ ids: [blogDetail._id] })
          .then(() => {
            navigate('/list', { replace: true });
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };

  const clickPreBlog = () => {
    navigate('/detail', { state: { id: preBlog?._id }, replace: true });
    document.querySelector('#root > div > div > div.right')?.scrollTo(0, 0);
  };
  const clickNextBlog = () => {
    navigate('/detail', { state: { id: nextBlog?._id }, replace: true });
    document.querySelector('#root > div > div > div.right')?.scrollTo(0, 0);
  };

  return (
    <div className="blog-detail">
      <div className="blog-wrapper">
        <div className="blog-mark">{blogDetail.isOriginal ? '原创' : '转载'}</div>
        <h1 className="blog-title">{blogDetail.title}</h1>
        <div className="blog-img">
          <img src={blogDetail.image?.url} alt={blogDetail.image?.name} />
        </div>
        <div className="blog-content">
          <MdPreview
            editorId={id}
            modelValue={blogDetail.markdownContent}
            previewTheme="github"
            codeTheme="github"
          />
        </div>

        <div className="pre-next">
          {preBlog && (
            <p className="item" onClick={clickPreBlog}>
              上一篇：{preBlog.title}
            </p>
          )}
          {nextBlog && (
            <p className="item" onClick={clickNextBlog}>
              下一篇：{nextBlog.title}
            </p>
          )}
        </div>

        <div className="btn-wrapper">
          <Button type="primary" style={{ marginRight: '15px' }} onClick={editBlog}>
            编辑
          </Button>
          <Button type="primary" danger onClick={deleteBlog}>
            删除
          </Button>
        </div>

        <ArticleComments blogDetail={blogDetail} />
      </div>

      <div className="catalog-wrapper">
        <div className="catalog">
          <MdCatalog
            editorId={id}
            scrollElement={scrollElement}
            scrollElementOffsetTop={20}
            onClick={onCatalogClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
