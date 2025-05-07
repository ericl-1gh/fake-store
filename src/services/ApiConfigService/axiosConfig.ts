// import {store} from '@store';
import axios from 'axios';
import {BASE_URL, SERVER_URL} from './app-setting';

export const getAxiosInstance = () => {
  //  console.log('sdfsdfsfsd', store?.getState()?.user);
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      //   Authorization: 'Bearer ' + (store?.getState()?.user?.accessToken ?? ''),
    },
  });
  return instance;
};

export const getAxiosInstanceFakeStore = (token?: string) => {
  const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + (token ?? ''),
    },
  });
  return instance;
};
