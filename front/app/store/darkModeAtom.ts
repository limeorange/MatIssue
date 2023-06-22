import { atom } from "recoil";

const darkModeAtom = atom<boolean>({
  key: "darkModeState",
  default:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("darkMode") || "false")
      : false,
});

export default darkModeAtom;
