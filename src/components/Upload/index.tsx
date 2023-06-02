import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps, UploadFile } from 'antd/es/upload/interface';
import { Button, Upload, Space, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { getQiniuTokenRequest } from '../../http/api';

type CompProps = {
  ossPathByParent?: string;
  disableInput?: boolean;
};

type QiniuInfoType = {
  qiniuUploadToken: string;
  uploadDomain: string;
  downloadDomain: string;
  key: string;
};

type CustomeFile = UploadFile & {
  extraData?: QiniuInfoType;
};

const UploadFileComp = ({ ossPathByParent = '', disableInput = false }: CompProps) => {
  const [ossPath, setOssPath] = useState('blog/image/前端笔记');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (ossPathByParent) {
      setOssPath(ossPathByParent);
    }
  }, [ossPathByParent]);

  const getQiniuServerInfo: UploadProps['beforeUpload'] = async (file: RcFile) => {
    try {
      if (ossPath) {
        const key = `${ossPath}/${file.name}`;
        const response = await getQiniuTokenRequest(key);
        const extraData: QiniuInfoType = {
          ...response.data,
          key,
        };
        const ff = file as CustomeFile;
        ff.extraData = extraData;
        return ff as RcFile;
      } else {
        message.error('请先填写需要上传到的路径');
        return Promise.reject(new Error('请先填写需要上传到的路径'));
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const getAction: UploadProps['action'] = (file) => {
    const ff = file as CustomeFile;
    return ff.extraData?.uploadDomain || '';
  };

  const getExtraData: UploadProps['data'] = (file) => {
    const ff = file as CustomeFile;
    return {
      token: ff.extraData?.qiniuUploadToken || '',
      key: ff.extraData?.key || '',
    };
  };

  const onChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.data.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const onRemove: UploadProps['onRemove'] = (file) => {
    console.log(file);
    // async removeImage(file) {
    //   this.sentry.addBreadcrumb('components/Upload.vue --> methods: removeImage');
    //   try {
    //     let filename = file.name;
    //     await this.$confirm(`确定移除 ${filename}？`);
    //     await this.axios.post(API.requireAuth.removeImage, { filename });
    //     let index = this.uploadImageList.findIndex(item => item.name === filename);
    //     this.uploadImageList.splice(index, 1);
    //   } catch (err) {
    //     this.handleError(err);
    //     return Promise.reject(err);
    //   }
    // }
  };
  return (
    <Space direction="vertical">
      <Input
        addonBefore="ossPath"
        value={ossPath}
        onChange={(e) => setOssPath(e.target.value)}
        disabled={disableInput}
      />
      <Upload
        action={getAction}
        data={getExtraData}
        accept="image/*,.pdf"
        fileList={fileList}
        beforeUpload={getQiniuServerInfo}
        onChange={onChange}
        onRemove={onRemove}
      >
        <Button icon={<UploadOutlined />}>点击开始选择文件上传</Button>
      </Upload>
    </Space>
  );
};

export default UploadFileComp;
