import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  getToken: () => void;
  user: any;
}

const useAuthStore = create<AuthState>(set => ({
  token: null,
  user: null,
  isLoggedIn: false,
  setToken: async (token: string) => {
    await AsyncStorage.setItem('token', token);
    set({token, isLoggedIn: true});
  },
  clearToken: async () => {
    await AsyncStorage.removeItem('token');
    set({token: null, isLoggedIn: false});
  },
  getToken: async () => {
    const token = await AsyncStorage.getItem('token');
    set({token, isLoggedIn: !!token});
  },
  setUser: (user: any) => set({user}),
}));

export default useAuthStore;
