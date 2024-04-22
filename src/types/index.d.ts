// 后台返回的用户数据
type UserType = {
  username: string;
  password: string;
  _id?: string;
};

// 调删除接口时需要传ids
type IDType = {
  id: sting;
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

// 评论
type Comments = {
  id: string; // 评论id，后端自动生成
  arthur: string; // 评论作者，前端传
  email: string; // 评论作者的邮箱，前端传
  content: string; // 评论内容，前端传
  reply: Reply[]; // 该评论下面所有的回复
  date: number; // 评论时间
  isHide: boolean; // 是否需要隐藏
};

// 评论下的回复
type Reply = {
  parentId: string; // 哪条评论下的回复
  replyId: string; // 回复的哪条评论
  isReplyParent: boolean; // 是否对父级评论的回复

  replyArthur: string; // 回复的哪个作者
  replyEmail: string; // 回复的哪个邮箱
  replyContent: string; // 回复的哪个内容

  id: string; // 本回复的id
  arthur: string; // 本回复的作者
  email: string; // 本回复的作者邮箱
  content: string; // 本回复的内容
  date: number; // 回复时间
  isHide: boolean; // 是否需要隐藏
};

// 前端发送评论的请求格式
type CommentRequest = {
  blogId: string;
  comment: Comments;
};

type ReplyRequest = {
  blogId: string;
  parentId: string;
  replyId: string;
  comment: Comments;
};

// 博客详情
type BlogDetailType = BlogType & {
  htmlContent: string;
  markdownContent: string;
  comments?: Comments[];
};
