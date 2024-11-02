import {create} from 'apisauce';

const api = create({
  baseURL: 'http://192.168.100.229:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const signUp = (data: {fullName: string; email: string; password: string}) => {
  return api.post('/api/user/register', data);
};
const signIn = (data: {email: string; password: string}) => {
  return api.post('/api/user/login', data);
};

api.addMonitor(response => {
  if (!response.ok) {
    console.error('Network or Server Error:', response);
  }
});

export default {
  signUp,
  signIn,
};
