// import {Dispatch} from '@reduxjs/toolkit';
import {getAxiosInstance} from '@services';

export const performGetRequest = (endpoint: string) => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();

      const response = await wrapper.get(endpoint);

      //-->If you want to go with graphql then use below query with params

      //   const response = await wrapper.post(endpoint, {
      //     query,
      //     params,
      //   });
      return response.data;
    } catch (error: any) {
      console.log('check error is >>>', error);
      throw error;
    }
  };
};

export const performPostRequest = async (
  endPoint: string,
  jsonRequest: any,
) => {
  //   return async (dispatch: Dispatch, getState: any): Promise<any> => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();
      const response = await wrapper.post(endPoint, jsonRequest);
      return response;
    } catch (error: any) {
      throw error;
    }
  };
};
export const performPutRequest = async (endPoint: string, jsonRequest: any) => {
  //   return async (dispatch: Dispatch, getState: any): Promise<any> => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();
      const response: any = await wrapper.put(endPoint, jsonRequest);
      return response;
    } catch (error: any) {
      throw error;
    }
  };
};

export const performDeleteRequest = async (
  endPoint: string,
  jsonRequest?: any,
) => {
  // return async (dispatch: Dispatch, getState: any): Promise<any> => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();
      const response: any = await wrapper.delete(endPoint, {
        data: jsonRequest,
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  };
};

export const performParallelRequest = async (
  jsonArray: Promise<any>[],
): Promise<any[]> => {
  try {
    const responses = await Promise.all(jsonArray);
    return responses;
  } catch (error) {
    throw error;
  }
};
