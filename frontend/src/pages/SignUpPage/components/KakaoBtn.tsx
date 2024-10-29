import styled from "styled-components";
import KakaoIcon from "@assets/icons/kakaoIcon.svg?react";
import { redirect } from "react-router-dom";
import { REDIRECT_URI } from "../apis/signUp";

const BtnCommonStyle = styled.button`
  width: 400px;
  height: 48px;
  border-radius: 10px;
  border-style: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const KakaoSignUpBtn = styled(BtnCommonStyle)`
  background-color: #fee500;
  margin-bottom: 27px;
`;

type PropType = {
  btnText: string;
};

const KakaoBtn = (props: PropType) => {
  const Kakao = window.Kakao;

  const loginKakao = () => {
    console.log("login!!");
    Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });
  };

  return (
    <div>
      <KakaoSignUpBtn onClick={loginKakao}>
        <KakaoIcon style={{ width: "18px", height: "18px" }} />
        <span>{props.btnText}</span>
      </KakaoSignUpBtn>
    </div>
  );
};

export default KakaoBtn;
