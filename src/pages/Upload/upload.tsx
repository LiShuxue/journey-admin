import { useState } from 'react';
import { Button, Input, Space } from 'antd';
import UploadFileComp from '../../components/Upload';
import { UploadOutlined } from '@ant-design/icons';
import { adminUpload } from '../../http/api';

const Upload = () => {
  const [project, setProject] = useState('blog-article');
  const [fromPath, setFromPath] = useState('前端笔记/babel.png');
  const [isLoading, setLoading] = useState(false);

  const uploadFile = () => {
    setLoading(true);
    adminUpload({ project, fromPath }).finally(() => {
      setLoading(false);
    });
  };
  return (
    <div>
      <div style={{ marginBottom: '45px' }}>
        <p>1、服务器直传，需要先将文件同步到github，服务器会从github拉取并上传</p>
        <Space>
          <Input
            addonBefore="project:"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <Input
            addonBefore="fromPath:"
            value={fromPath}
            onChange={(e) => setFromPath(e.target.value)}
          />
          <Button
            icon={<UploadOutlined />}
            onClick={uploadFile}
            loading={isLoading}
            disabled={isLoading}
          >
            点击开始从服务端上传文件
          </Button>
        </Space>
      </div>

      <div>
        <p>2、客户端上传，可以直接选择文件进行上传，但是可能公司内网限制上传不了</p>
        <UploadFileComp />
      </div>
    </div>
  );
};

export default Upload;
