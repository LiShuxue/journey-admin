import { useState } from 'react';
import { Button, Input, Space } from 'antd';
import UploadFileComp from '../../components/Upload';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminUpload, deleteBucketFile } from '../../http/api';

const Upload = () => {
  const [project, setProject] = useState('blog-article');
  const [fromPath, setFromPath] = useState('前端笔记/babel.png');
  const [filename, setFilename] = useState('');
  const [ossPath, setOssPath] = useState('blog/mongodb/');
  const [isLoading, setLoading] = useState(false);

  const uploadFile = () => {
    setLoading(true);
    adminUpload({ project, fromPath }).finally(() => {
      setLoading(false);
    });
  };

  const deleteFile = () => {
    setLoading(true);
    deleteBucketFile({ filename: ossPath + filename }).finally(() => {
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

      <div style={{ marginBottom: '45px' }}>
        <p>2、客户端上传，可以直接选择文件进行上传，但是可能公司内网限制上传不了</p>
        <UploadFileComp />
      </div>

      <div style={{ marginBottom: '45px' }}>
        <p>3、删除文件，根据文件名称，删除bucket上对应oss path的文件</p>
        <Space>
          <Input
            addonBefore="ossPath:"
            value={ossPath}
            onChange={(e) => setOssPath(e.target.value)}
          />
          <Input
            addonBefore="filename:"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={deleteFile}
            loading={isLoading}
            disabled={isLoading}
          >
            点击删除文件
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Upload;
