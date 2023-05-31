import http from './axios';

export const loginRequest = (body: UserDataType) => {
  return http.post('admin/login', body);
};

export const userListRequest = () => {
  return http.get('admin/list');
};

export const registerRequest = (body: UserDataType) => {
  return http.post('admin/register', body);
};

export const updateUserRequest = (body: UserDataType) => {
  return http.post('admin/update', body);
};

export const deleteUserRequest = (body: IDsTypes) => {
  return http.post('admin/delete', body);
};
