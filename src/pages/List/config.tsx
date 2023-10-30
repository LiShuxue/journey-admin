import { Space, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

export const getColumns = (
  gotoDetail: (blog: BlogType) => void,
  gotoEdit: (blog: BlogType) => void,
  deleteItem: (blog: BlogType) => void,
  showTitleOnly: (blog: BlogType) => void
): ColumnsType<BlogType> => {
  return [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '300px',
      render: (title: string, blog: BlogType) => (
        <div style={{ color: '#0958d9', cursor: 'pointer' }} onClick={() => gotoDetail(blog)}>
          {title}
        </div>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (data: string[]) => {
        return data.map((item) => {
          return (
            <Tag color="blue" key={item}>
              {item}
            </Tag>
          );
        });
      },
    },
    {
      title: '查看次数',
      dataIndex: 'see',
      key: 'see',
    },
    {
      title: '点赞次数',
      dataIndex: 'like',
      key: 'like',
    },
    {
      title: '发表时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      width: '200px',
      render: (time: string) => <div>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</div>,
      sorter: (a: BlogType, b: BlogType) => (a.publishTime as number) - (b.publishTime as number),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: '200px',
      render: (time: string) => <div>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</div>,
      sorter: (a: BlogType, b: BlogType) => (a.updateTime as number) - (b.updateTime as number),
    },
    {
      title: '操作',
      key: 'action',
      render: (blog: BlogType) => (
        <Space size="middle">
          <Button type="primary" onClick={() => gotoDetail(blog)}>
            查看
          </Button>
          <Button onClick={() => gotoEdit(blog)}>编辑</Button>
          <Button danger onClick={() => deleteItem(blog)}>
            删除
          </Button>
          <Button type="primary" onClick={() => showTitleOnly(blog)}>
            查看目录
          </Button>
        </Space>
      ),
    },
  ];
};
