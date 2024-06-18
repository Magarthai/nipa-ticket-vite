import { create } from "zustand";

interface IUserStore {
  userData?: IUserEntity;

  setUser: (ticket: IUserEntity) => void;
}

export interface IUserEntity {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;
  created_at: Date;
  updated_at: Date;
}

export const useUserStore = create<IUserStore>((set) => ({
  userData: undefined,
  setUser(val) {
    set({
      userData: val,
    });
  },
}));
