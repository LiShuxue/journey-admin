import { useState, useEffect } from 'react';
import { blogListRequest } from '../http/api';

export const useGetBlogList = () => {
  const [loading, setLoading] = useState(false);
  const [blogList, setList] = useState<BlogType[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const fetchList = () => {
    setLoading(true);
    blogListRequest()
      .then((response) => {
        const list: BlogType[] = response.data || [];
        setList(list);

        const categoryList: string[] = [];
        list.forEach((item) => {
          if (item.category) {
            categoryList.push(item.category);
          }
        });
        setCategoryList([...new Set(categoryList)]);
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

  const addCategory = (category: string) => {
    if (category) {
      const list = [...categoryList, category];
      setCategoryList([...new Set(list)]);
    }
  };

  return { loading, blogList, fetchList, categoryList, addCategory };
};
