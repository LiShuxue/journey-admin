import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button } from 'antd';
import CommentsPublish from './CommentsPublish';
import { hideCommentsRequest, deleteCommentsRequest } from '../../../http/api';

type CommentsItemProps = {
  comment: Reply;
  blogDetail: BlogDetailType;
  parent?: Reply;
  confirmAction: (comment: CommentRequest) => void;
  children?: React.ReactNode;
};
const CommentsItem = ({
  parent,
  comment,
  blogDetail,
  confirmAction,
  children,
}: CommentsItemProps) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const showAddComments = () => {
    setShow(true);
  };

  const handleAddComments = (newComment: CommentRequest) => {
    const comInfo = newComment.comment;
    confirmAction({
      comment: comInfo,
      parent_id: parent ? parent.id : comment.id,
      replyName: comment.arthur,
      replyEmail: comment.email,
      replyContent: comment.content,
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
        {comment.replyName ? (
          <span>
            {comment.arthur}&nbsp;回复&nbsp;{comment.replyName}
          </span>
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
          confirmAction={handleAddComments}
          cancleAction={() => setShow(false)}
        />
      )}

      {children}
    </div>
  );
};

export default CommentsItem;
