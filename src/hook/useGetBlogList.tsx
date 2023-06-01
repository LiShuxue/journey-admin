import { useState, useEffect } from 'react';
import { blogListRequest } from '../http/api';

export const useGetBlogList = () => {
  const [loading, setLoading] = useState(false);
  const [blogList, setList] = useState<BlogType[]>([]);

  const fetchList = () => {
    setLoading(true);
    blogListRequest()
      .then((response) => {
        const list = response.data.blogList || [];
        setList(list);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return { loading, blogList, fetchList };
};
