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

export const addCommentsRequest = (comment: CommentRequest) => {
  return http.post('blog/comment/add', comment);
};
export const hideCommentsRequest = (blog_id: string, commentId: string) => {
  return http.post('blog/comment/hide', { blog_id, commentId });
};
export const deleteCommentsRequest = (blog_id: string, commentId: string) => {
  return http.post('blog/comment/delete', { blog_id, commentId });
};

export const adminUpload = (body: { project: string; fromPath: string }) => {
  return http.post('/qiniu/adminupload', body);
};

export const deleteBucketFile = (body: { filename: string }) => {
  return http.post('/qiniu/removeImage', body);
};
