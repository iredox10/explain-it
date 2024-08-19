import { useEffect, useState } from "react";
import { create } from "zustand";

export const useUserStore = create((set) => ({

  user: null,
  // setUser: (user)=> set({user})
  setUser: () => set((state) => ({ user: state.user })),
}));
