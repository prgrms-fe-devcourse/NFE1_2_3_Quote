import styled from "styled-components";
import KakaoIcon from "@assets/icons/kakaoIcon.svg?react";

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
  const loginKakao = () => {
    //window.location.href = kakaoURL;
    fetch(import.meta.env.VITE_APP_CALLBACK_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        //카카오 로그인 페이지 url
        return response.json();
      })
      .then((data) => {
        //redirect 이동
        window.location.href = data.data;
      })
      .catch((error) => {
        console.error("Kakao login failed:", error);
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
