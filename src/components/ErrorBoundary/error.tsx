// 错误边界
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const err = useRouteError() as { message: string };
  return (
    <div>
      <h1>Somthing went wrong!</h1>
      <p>{err.message}</p>
    </div>
  );
};

export default ErrorBoundary;
