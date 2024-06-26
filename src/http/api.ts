import http from './axios';

export const loginRequest = (body: UserType) => {
  return http.post('auth/login', body);
};

export const userListRequest = () => {
  return http.get('user/list');
};

export const registerRequest = (body: UserType) => {
  return http.post('user/create', body);
};

export const updateUserRequest = (body: UserType) => {
  return http.post('user/update', body);
};

export const deleteUserRequest = (body: IDType) => {
  return http.post('user/delete', body);
};

export const blogListRequest = () => {
  return http.get('blog/list');
};

export const deleteBlogRequest = (body: IDType) => {
  return http.post('blog/delete', body);
};

export const getBlogDetailRequest = (id: string) => {
  return http.get(`blog/detail?id=${id}`);
};

export const getQiniuTokenRequest = (key: string) => {
  return http.get(`common/uploadToken?key=${key}`);
};

export const updateBlogRequest = (blog: BlogDetailType) => {
  return http.post('blog/update', blog);
};

export const publishBlogRequest = (blog: BlogDetailType) => {
  return http.post('blog/create', blog);
};

export const addCommentsRequest = (comment: CommentRequest) => {
  return http.post('blog/comment/add', comment);
};
export const replyCommentsRequest = (reply: ReplyRequest) => {
  return http.post('blog/comment/reply', reply);
};
export const hideCommentsRequest = (blogId: string, commentId: string) => {
  return http.post('blog/comment/hide', { blogId, commentId });
};
export const deleteCommentsRequest = (blogId: string, commentId: string) => {
  return http.post('blog/comment/delete', { blogId, commentId });
};

export const adminUpload = (body: { project: string; fromPath: string }) => {
  return http.post('/common/uploadFile', body);
};

export const deleteBucketFile = (body: { filename: string }) => {
  return http.post('/common/deleteFile', body);
};
