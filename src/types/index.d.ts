// 后台返回的用户数据
type UserType = {
  username: string;
  password: string;
  _id?: string;
};

// 调删除接口时需要传ids
type IDsType = {
  ids: Array<sting>;
};

// 后台返回的博客列表数据
type BlogType = {
  title: string;
  subTitle: string;
  category: string;
  image: {
    name: string;
    url: string;
  };
  name?: string;
  url?: string;
  isOriginal: boolean;
  like?: number;
  see?: number;
  tags: string[];
  publishTime?: number;
  updateTime?: number;
  _id?: string;
};

// 评论数据
type Comments = {
  id?: string;
  arthur: string;
  date?: number;
  content: string;
  email: string;
  reply?: Reply[];
  isHide?: boolean;
};

// 评论的回复
type Reply = Comments & {
  parentId?: string;
  replyName?: string;
  replyEmail?: string;
  replyContent?: string;
};

// 前端发送评论的请求格式
type CommentRequest = {
  blog_id?: string;
  comment: Comments;
  parent_id?: string;
  replyContent?: string;
  replyEmail?: string;
  replyName?: string;
};

// 博客详情
type BlogDetailType = BlogType & {
  htmlContent: string;
  markdownContent: string;
  comments?: Comments[];
};
