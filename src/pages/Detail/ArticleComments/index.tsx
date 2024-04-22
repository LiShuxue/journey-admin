import { useNavigate } from 'react-router-dom';
import CommentsPublish from './CommentsPublish';
import CommentsItem from './CommentsItem';
import { addCommentsRequest, replyCommentsRequest } from '../../../http/api';

import './index.scss';

type ArticleCommentsProps = {
  blogDetail: BlogDetailType;
};

const ArticleComments = ({ blogDetail }: ArticleCommentsProps) => {
  const navigate = useNavigate();

  const addComments = (commentInfo: { comment: Comments }) => {
    const { comment } = commentInfo;
    addCommentsRequest({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      blogId: blogDetail._id!,
      comment,
    })
      .then(() => {
        navigate('/detail', { state: { id: blogDetail._id }, replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const replyComments = (replyInfo: ReplyRequest) => {
    const { parentId, replyId, comment } = replyInfo;
    replyCommentsRequest({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      blogId: blogDetail._id!,
      parentId,
      replyId,
      comment,
    })
      .then(() => {
        navigate('/detail', { state: { id: blogDetail._id }, replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="comments-wrapper">
      <CommentsPublish confirmAction={addComments} />
      <div className="comments-list">
        {blogDetail.comments &&
          blogDetail.comments.map((comment: Comments, index: number) => (
            <CommentsItem
              key={index}
              comment={comment}
              blogDetail={blogDetail}
              replyComments={replyComments}
            ></CommentsItem>
          ))}
      </div>
    </div>
  );
};

export default ArticleComments;
