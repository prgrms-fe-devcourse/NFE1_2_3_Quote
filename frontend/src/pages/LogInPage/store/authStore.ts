import { create } from "zustand";

interface StoreState {
  isLogin: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
}

const setToken = (token: string) => {
  localStorage.setItem('token', token);
}

const removeToken = () => {
  localStorage.removeItem('token');
}

export const useAuthStore = create<StoreState>((set) => ({
  //isLogin으로 로그인한 유저인지 아닌지 판별
  isLogin: getToken() ? true : false, 

  //로그인 시 토큰을 저장하고 isLogin상태를 true로 변경
  storeLogin: (token: string) => {
    set({ isLogin: true });
    setToken(token);
  },

  //로그아웃 시 저장된 토큰을 삭제하고 isLogin상태를 false로 변경
  storeLogout: () => {
    set({ isLogin: false });
    removeToken();
  }
}))

