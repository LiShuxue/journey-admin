import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdPreview, MdCatalog } from 'md-editor-rt';
import type { TocItem } from 'md-editor-rt/lib/types/MdCatalog';
import 'md-editor-rt/lib/style.css';
import { useGetBlogDetail } from '../../hook/useGetBlogDetail';

import './detail.scss';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogDetail, getBlogDetail } = useGetBlogDetail();
  const [id] = useState('preview-blog');
  const [scrollElement] = useState('.right');

  useEffect(() => {
    const id = location.state?.id || '';
    getBlogDetail(id);
  }, [location, getBlogDetail]);

  const onClick = (e: React.MouseEvent, t: TocItem) => {
    console.log(e);
    navigate(`/detail#${t.text}`, { replace: true });
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
      </div>

      <div className="catalog-wrapper">
        <div className="catalog">
          <MdCatalog
            editorId={id}
            scrollElement={scrollElement}
            scrollElementOffsetTop={20}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
