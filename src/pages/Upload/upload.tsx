import { useState } from 'react';
import { Button, Input, Space } from 'antd';
import UploadFileComp from '../../components/Upload';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const Upload = () => {
  const [project, setProject] = useState('blog-article');
  const [fromPath, setFromPath] = useState('前端笔记/babel.png');

  const uploadFile = () => {
    // nginx 会重定向到 服务器本地的5555端口，即 http://47.93.18.226:5555
    axios.post('/adminupload', { project, fromPath });
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
          <Button icon={<UploadOutlined />} onClick={uploadFile}>
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
