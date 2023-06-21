import { atom } from "recoil";

const darkModeAtom = atom<boolean>({
  key: "darkModeState",
  default: JSON.parse(localStorage.getItem("darkMode") || "false"),
});

export default darkModeAtom;
