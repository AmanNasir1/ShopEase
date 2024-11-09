import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'apisauce';
const api = create({
  baseURL: 'http://192.168.100.229:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.axiosInstance.interceptors.request.use(async request => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
});
api.axiosInstance.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

api.addResponseTransform(response => {
  if (!response.ok) {
    const {status, data, problem} = response;
    const errorMessage =
      data?.message || problem || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
});

const callApi = async <D, R>({
  url,
  method = 'get',
  data,
  params,
}: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  data?: D;
  params?: Record<string, any>;
}) => {
  const response = await api[method]<R>(url, data, {params});

  if (response.ok && response.data) {
    return response.data;
  } else {
    throw new Error(response.problem || 'An error occurred');
  }
};

export default {
  callApi,
};
