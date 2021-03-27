import create from "zustand";

import { User } from "../types/User";

type State = {
  user: User | null;
  updateUser: (user: User) => void;
};

const useStore = create<State>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user: user })),
}));

export default useStore;
