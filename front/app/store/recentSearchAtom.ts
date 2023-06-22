import { atom } from "recoil";

const recentSearchAtom = atom<string[]>({
  key: "recentSearchState",
  default:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("searches") ?? "[]")
      : [],
});

export default recentSearchAtom;
