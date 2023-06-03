import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: { currentUser: null },
});

export const loginState = atom({
  key: "loginState",
  default: false,
});
