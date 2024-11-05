import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'apisauce';
const api = create({
  baseURL: 'http://192.168.100.229:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.axiosInstance.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

api.axiosInstance.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

const token = AsyncStorage.getItem('authToken');
if (token) {
  api.setHeader('Authorization', `Bearer ${token}`);
}

const signUp = (data: {name: string; email: string; password: string}) => {
  return api.post('/api/user/register', data);
};
const signIn = async (data: {email: string; password: string}) => {
  const response = await api.post('/api/user/login', data);
  // if (response.ok && response.data) {
  //   console.log({response});

  //   api.setHeader('Authorization', `Bearer ${response.data}`);
  //   // Optionally, save token to AsyncStorage or SecureStore for persistence
  //   await AsyncStorage.setItem('authToken', JSON.stringify(response.data));
  // }
  return response;
};

api.addRequestTransform(async request => {
  const token = await AsyncStorage.getItem('token');
  console.log('token===>', token);

  if (token) {
    request.headers = request.headers || {};
    request.headers['Authorization'] = `Bearer ${token}`;
  }
});

api.addResponseTransform(response => {
  if (!response.ok) {
    const {status, problem, data} = response;
    console.log('response=========>', response);

    switch (status) {
      case 400:
        throw new Error(data.message);
      case 401:
        throw new Error(data.message);
      case 403:
        throw new Error(data.message);
      case 500:
        throw new Error(data.message);
      default:
        throw new Error(
          data?.message || problem || 'An unknown error occurred.',
        );
    }
  }
});



  export default {
  signUp,
  signIn,
};
