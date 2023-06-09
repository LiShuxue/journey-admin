import { useCallback, useState } from 'react';
import { useGetBlogList } from './useGetBlogList';

export const usePreNextBlog = () => {
  const [preBlog, setPreBlog] = useState<BlogType>();
  const [nextBlog, setNextBlog] = useState<BlogType>();
  const { blogList } = useGetBlogList();

  const getPreNextBlog = useCallback(
    (id: string, category: string) => {
      const blogListWithSameCategory = blogList.filter((value) => {
        return value.category === category;
      });
      let currentIndex = 0;
      blogListWithSameCategory.forEach((value, index) => {
        if (value._id === id) {
          currentIndex = index;
        }
      });

      const pre = blogListWithSameCategory[currentIndex - 1];
      const next = blogListWithSameCategory[currentIndex + 1];

      if (pre && pre._id !== id) {
        setPreBlog(pre);
      }
      if (next && next._id !== id) {
        setNextBlog(next);
      }
    },
    [blogList]
  );

  return { preBlog, nextBlog, getPreNextBlog };
};
