import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button } from 'antd';
import CommentsPublish from './CommentsPublish';
import { hideCommentsRequest, deleteCommentsRequest } from '../../../http/api';

type CommentsItemProps = {
  comment: Comments | Reply;
  blogDetail: BlogDetailType;
  parent?: Comments;
  replyComments: (reply: ReplyRequest) => void;
};
const CommentsItem = ({ parent, comment, blogDetail, replyComments }: CommentsItemProps) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const showAddComments = () => {
    setShow(true);
  };

  const handleAddComments = ({
    newComment,
    replyId,
  }: {
    newComment: Comments;
    replyId: string;
  }) => {
    replyComments({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      blogId: blogDetail._id!,
      comment: newComment,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      parentId: (parent ? parent.id : comment.id)!,
      replyId,
    });
    setShow(false);
  };

  const handleHideComments = (commentId: string) => {
    hideCommentsRequest(blogDetail._id as string, commentId)
      .then(() => {
        navigate('/detail', { state: { id: blogDetail._id }, replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteComments = (commentId: string) => {
    deleteCommentsRequest(blogDetail._id as string, commentId)
      .then(() => {
        navigate('/detail', { state: { id: blogDetail._id }, replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="comment-item" style={{ display: comment.isHide ? 'none' : 'block' }}>
      <div className="arthur">
        {'isReplyParent' in comment && !comment.isReplyParent && comment.replyArthur ? (
          <span>
            {comment.arthur}&nbsp;回复&nbsp;{comment.replyArthur}
          </span>
        ) : 'isReplyParent' in comment && comment.isReplyParent ? (
          <span>{comment.arthur}&nbsp;回复&nbsp;楼主</span>
        ) : (
          <span>{comment.arthur}</span>
        )}
      </div>
      <div className="content">{comment.content}</div>
      <div className="comment-tool-wrapper">
        <div className="date">{dayjs(comment.date).format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>
          <Button size="small" onClick={showAddComments} style={{ marginRight: '5px' }}>
            回复
          </Button>
          <Button
            size="small"
            onClick={() => handleHideComments(comment.id as string)}
            style={{ marginRight: '5px' }}
          >
            隐藏
          </Button>
          <Button size="small" onClick={() => handleDeleteComments(comment.id as string)}>
            删除
          </Button>
        </div>
      </div>

      {show && (
        <CommentsPublish
          showCancle={true}
          confirmAction={(val) =>
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            handleAddComments({ newComment: val.comment, replyId: comment.id! })
          }
          cancleAction={() => setShow(false)}
        />
      )}

      <div className="comment-reply">
        {'reply' in comment &&
          comment.reply &&
          comment.reply.map((item: Reply, index: number) => (
            <CommentsItem
              key={index}
              parent={comment}
              comment={item}
              blogDetail={blogDetail}
              replyComments={replyComments}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentsItem;
