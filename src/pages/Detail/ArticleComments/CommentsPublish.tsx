import { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
const { TextArea } = Input;

type CommentsPublishProps = {
  showCancle?: boolean;
  confirmAction: (comment: CommentRequest) => void;
  cancleAction?: () => void;
};

const CommentsPublish = ({
  showCancle = false,
  cancleAction = () => {
    return;
  },
  confirmAction,
}: CommentsPublishProps) => {
  const [arthur, setArthur] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setArthur(localStorage.getItem('arthur') || '');
    setEmail(localStorage.getItem('email') || '');
  }, []);

  const validateInputSuccess = () => {
    if (
      !arthur ||
      !email ||
      !content ||
      !arthur.toString().trim() ||
      !email.toString().trim() ||
      !content.toString().trim()
    ) {
      message.error('请正确填写相关信息');
      return false;
    }

    const pattern = new RegExp(
      /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,8})$/
    );
    if (!pattern.test(email)) {
      message.error('请正确填写邮件地址，如果有回复我们将以邮件通知您');
      return false;
    }

    return true;
  };

  const confirm = () => {
    if (validateInputSuccess()) {
      const comment = {
        arthur: arthur.toString().trim(),
        email: email.toString().trim(),
        content: content.toString().trim(),
      };
      localStorage.setItem('arthur', arthur.toString().trim());
      localStorage.setItem('email', email.toString().trim());
      confirmAction && confirmAction({ comment });
    }
  };

  const cancle = () => {
    cancleAction && cancleAction();
  };

  return (
    <div className="comments-publish">
      <div className="arthur-info">
        <Input
          placeholder="arthur"
          value={arthur}
          onChange={(e) => setArthur(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <Input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <TextArea
        rows={3}
        placeholder="发表您的见解"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="comment-content"
      ></TextArea>

      {showCancle && (
        <Button className="cancle-button" size="small" onClick={cancle}>
          取消
        </Button>
      )}
      <Button className="confirm-button" size="small" onClick={confirm}>
        评论
      </Button>
    </div>
  );
};

export default CommentsPublish;
