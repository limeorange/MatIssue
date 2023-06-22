import { DarkModeProps } from "../types/darkMode";

export const iconColor = (props: DarkModeProps) =>
  props.isDarkMode
    ? "invert(89%) sepia(27%) saturate(436%) hue-rotate(334deg) brightness(105%) contrast(104%)"
    : "invert(18%) sepia(10%) saturate(2848%) hue-rotate(357deg) brightness(103%) contrast(82%)";
