import { atom } from "recoil";

export const EIState = atom<number>({
  key: "EI",
  default: 0,
});
export const SNState = atom<number>({
  key: "SN",
  default: 0,
});
export const TFState = atom<number>({
  key: "TF",
  default: 0,
});
export const JPState = atom<number>({
  key: "JP",
  default: 0,
});
export const datasState = atom<string>({
  key: "datas",
  default: "",
});
export const MBTIState = atom<string>({
  key: "MBTI",
  default: "",
});
