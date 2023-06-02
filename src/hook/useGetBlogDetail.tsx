import { useCallback, useState } from 'react';
import { getBlogDetailRequest } from '../http/api';

export const useGetBlogDetail = () => {
  const [loading, setLoading] = useState(false);
  const [blogDetail, setBlogDetail] = useState<BlogDetailType>({} as BlogDetailType);

  const getBlogDetail = useCallback((id: string) => {
    if (id) {
      setLoading(true);
      getBlogDetailRequest(id)
        .then((response) => {
          const blog = response.data.blog || {};
          setBlogDetail(blog);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return { loading, blogDetail, getBlogDetail };
};
