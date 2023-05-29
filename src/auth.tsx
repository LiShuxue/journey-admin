import { FC, createContext, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export type AuthContextType = {
  userName: string;
  accessToken: string;
  refreshToken: string;
  signin: (
    userName: string,
    accessToken: string,
    refreshToken: string,
    callback: VoidFunction
  ) => void;
  signout: (callback: VoidFunction) => void;
};

export type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  const signin = (
    userName: string,
    accessToken: string,
    refreshToken: string,
    callback: VoidFunction
  ) => {
    setUserName(userName);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    callback();
  };

  const signout = (callback: VoidFunction) => {
    setUserName('');
    setAccessToken('');
    setRefreshToken('');
    callback();
  };

  const value = { userName, accessToken, refreshToken, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.userName || !auth.accessToken || !auth.refreshToken) {
    return <Navigate to="/loginlsx" state={{ from: location }} replace />;
  }

  return children;
};
