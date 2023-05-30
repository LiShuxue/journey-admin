// require auth api call
const publishBlog = `blog/publish`;
const updateBlog = `blog/update`;
const deleteBlog = `blog/delete`;
const uploadToken = `qiniu/uploadToken`;
const removeImage = `qiniu/removeImage`;
const userList = `admin/list`;
const deleteUser = `admin/delete`;
const updateUser = `admin/update`;
const hideComments = `blog/comment/hide`;
const deleteComments = `blog/comment/delete`;

// not require auth api call
const login = `admin/login`;
const register = `admin/register`;
const blogList = `blog/list`;
const blogDetail = `blog/detail`;
const likeBlog = `blog/like`;
const addComments = `blog/comment/add`;
const getHomeInfo = `common/homeinfo`;

export default {
  requireAuth: {
    publishBlog,
    updateBlog,
    deleteBlog,
    uploadToken,
    removeImage,
    userList,
    deleteUser,
    updateUser,
    hideComments,
    deleteComments,
  },
  notRequireAuth: {
    login,
    register,
    blogList,
    blogDetail,
    likeBlog,
    addComments,
    getHomeInfo,
  },
};
