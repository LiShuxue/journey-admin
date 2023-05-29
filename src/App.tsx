import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const App: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<p>Route Loading...</p>} />;
};

export default App;

// 使用 hot.dispose 来清除任何由其更新副本产生的持久副作用
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
