import { atom } from "recoil";

const darkModeAtom = atom({
  key: "darkModeState",
  default: false,
});

export default darkModeAtom;
