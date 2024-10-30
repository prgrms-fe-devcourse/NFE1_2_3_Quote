import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "lightMode",
  colorMain: "#474040",
  colorButton: "#474040",
  colorHeader: "#F3F3F3",
  colorBackground: "#F3F3F3",
  colorMainFont: "#303030",
  colorSubFont: "#A7A7A7",
  colorValidation: "#D72121",
  colorSub: "#FFFFFF", //White
  colorCategoryList: "#ffffff",
  colorCategoryListHover: "#d4d4d4",
  colorCancelPopUp: "#ffffff",
  colorCancelPopUPBtnFont: "#675959",
  colorShadow: "rgba(0, 0, 0, 0.3)",
  colorLine: "rgba(0, 0, 0, 0.2)",
  전체: { bgColor: "#F9F9F9", fontColor: "#303030" },
  도서: { bgColor: "#E9E6D2", fontColor: "#303030" },
  노래: { bgColor: "#7F7D6F", fontColor: "#F9F9F9" },
  대사: { bgColor: "#889A86", fontColor: "#F9F9F9" },
  인터뷰: { bgColor: "#9EB5BA", fontColor: "#303030" },
  기타: { bgColor: "#CB8E84", fontColor: "#303030" },
};

export const darkTheme = {
  mode: "darkMode",
  colorMain: "#675959",
  colorButton: "#F3F3F3",
  colorHeader: "#030303",
  colorBackground: "#1B1B1E",
  colorMainFont: "#F3F3F3",
  colorSubFont: "#A7A7A7",
  colorValidation: "#E65C5C",
  colorSub: "#303030", //DarkCharcoal
  colorCategoryList: "#5d5d5d",
  colorCategoryListHover: "#393939",
  colorCancelPopUp: "#393939",
  colorCancelPopUPBtnFont: "#ffffff",
  colorShadow: "rgba(255, 255, 255, 0.3)",
  colorLine: "rgba(255, 255, 255, 0.2)",
  전체: { bgColor: "#303030", fontColor: "#F3F3F3" },
  도서: { bgColor: "#94917E", fontColor: "#F3F3F3" },
  노래: { bgColor: "#504E45", fontColor: "#F3F3F3" },
  대사: { bgColor: "#4F5B4E", fontColor: "#F3F3F3" },
  인터뷰: { bgColor: "#607174", fontColor: "#F3F3F3" },
  기타: { bgColor: "#7E5D58", fontColor: "#F3F3F3" },
};
