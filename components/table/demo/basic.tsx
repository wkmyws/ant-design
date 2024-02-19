import React from 'react';
import { Button, ConfigProvider, Space, Table, theme } from 'antd';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  const columns = new Array(20).fill(0).map((_, index) => ({
    title: `c${index}`,
    dataIndex: `c${index}`,
    width: 100,
    key: `c${index}`,
  }));
  const data = new Array(20).fill(0).map((_, index) => ({
    key: index,
    ...columns.reduce((pre, cur) => ({ ...pre, [cur.dataIndex]: `v${index}` }), {}),
  }));
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        algorithm: darkMode === true ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Button onClick={() => setDarkMode((e) => !e)}>Mode</Button>
      <Table columns={columns} dataSource={data} scroll={{ x: 300, y: 300 }} pagination={false} />
    </ConfigProvider>
  );
};

export default App;
