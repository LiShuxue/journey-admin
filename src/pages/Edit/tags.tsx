import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Space, Input, Tag } from 'antd';

type TagsProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
};
const Tags = ({ tags, onChange }: TagsProps) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    onChange(newTags);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      onChange([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: 'top',
  };

  return (
    <Space>
      {tags.map((tag) => {
        return (
          <Tag key={tag} closable={true} onClose={() => handleClose(tag)} color="cyan">
            <span>{tag}</span>
          </Tag>
        );
      })}

      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag color="blue" onClick={() => setInputVisible(true)} style={{ cursor: 'pointer' }}>
          <PlusOutlined /> 添加标签
        </Tag>
      )}
    </Space>
  );
};

export default Tags;
