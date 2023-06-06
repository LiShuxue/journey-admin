import http from './axios';

export const loginRequest = (body: UserType) => {
  return http.post('admin/login', body);
};

export const userListRequest = () => {
  return http.get('admin/list');
};

export const registerRequest = (body: UserType) => {
  return http.post('admin/register', body);
};

export const updateUserRequest = (body: UserType) => {
  return http.post('admin/update', body);
};

export const deleteUserRequest = (body: IDsType) => {
  return http.post('admin/delete', body);
};

export const blogListRequest = () => {
  return http.get('blog/list');
};

export const deleteBlogRequest = (body: IDsType) => {
  return http.post('blog/delete', body);
};

export const getBlogDetailRequest = (id: string) => {
  return http.get(`blog/detail?id=${id}`);
};

export const getQiniuTokenRequest = (key: string) => {
  return http.get(`qiniu/uploadToken?key=${key}`);
};

export const updateBlogRequest = (blog: BlogDetailType) => {
  return http.post('blog/update', blog);
};

export const publishBlogRequest = (blog: BlogDetailType) => {
  return http.post('blog/publish', blog);
};
