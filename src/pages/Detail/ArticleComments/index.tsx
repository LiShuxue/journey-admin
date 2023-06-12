import { useNavigate } from 'react-router-dom';
import CommentsPublish from './CommentsPublish';
import CommentsItem from './CommentsItem';
import { addCommentsRequest } from '../../../http/api';

import './index.scss';

type ArticleCommentsProps = {
  blogDetail: BlogDetailType;
};

const ArticleComments = ({ blogDetail }: ArticleCommentsProps) => {
  const navigate = useNavigate();

  const addComments = (commentInfo: CommentRequest) => {
    const { parent_id, replyName, replyEmail, replyContent, comment } = commentInfo;
    addCommentsRequest({
      blog_id: blogDetail._id,
      replyName,
      replyEmail,
      replyContent,
      parent_id,
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
      <div className="comments-list">
        <CommentsPublish confirmAction={addComments} />

        {blogDetail.comments &&
          blogDetail.comments.map((comment: Reply, index: number) => (
            <CommentsItem
              key={index}
              comment={comment}
              blogDetail={blogDetail}
              confirmAction={addComments}
            >
              <div className="comment-reply">
                {comment.reply &&
                  comment.reply.map((item: Reply, index: number) => (
                    <CommentsItem
                      key={index}
                      parent={comment}
                      comment={item}
                      blogDetail={blogDetail}
                      confirmAction={addComments}
                    />
                  ))}
              </div>
            </CommentsItem>
          ))}
      </div>
    </div>
  );
};

export default ArticleComments;
