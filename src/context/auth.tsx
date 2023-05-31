// 用在一些普通js中，因为useContext不能用在普通js中
let username = sessionStorage.getItem('username') || '';
let accessToken = sessionStorage.getItem('accessToken') || '';
let refreshToken = sessionStorage.getItem('refreshToken') || '';

const setUsername = (un: string) => {
  username = un;
  sessionStorage.setItem('username', un);
};

const setAccessToken = (at: string) => {
  accessToken = at;
  sessionStorage.setItem('accessToken', at);
};

const setRefreshToken = (rt: string) => {
  refreshToken = rt;
  sessionStorage.setItem('refreshToken', rt);
};

const getAuthData = () => {
  return {
    username,
    accessToken,
    refreshToken,
  };
};

export { setUsername, setAccessToken, setRefreshToken, getAuthData };
