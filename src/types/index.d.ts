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
  isOriginal: boolean;
  like: number;
  see: number;
  tags: string[];
  publishTime: number;
  updateTime: number;
  _id?: string;
};

// 评论数据
type Comment = {
  id: string;
  arthur: string;
  date: number;
  content: string;
  email: string;
  reply: Reply[];
  isHide: boolean;
};

// 评论的回复
type Reply = Comment & {
  parentId: string;
  replyName: string;
  replyEmail: string;
  replyContent: string;
};

// 博客详情
type BlogDetailType = BlogType & {
  htmlContent: string;
  markdownContent: string;
  comments: Comment[];
};
