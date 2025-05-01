// import {store} from '@store';
import axios from 'axios';
import {BASE_URL} from './app-setting';

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
