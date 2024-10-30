import Spinner from "@/components/Spinner/Spinner";
import { useAuthStore } from "@/pages/LogInPage/store/authStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RedirectPage = () => {
  const { storeLogin } = useAuthStore();
  const navigate = useNavigate();

  //Params를 추출하는 함수
  function getAuthCodeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log({ urlParams, code: urlParams.get("code") });
    return urlParams.get("code");
  }

  //추출한 Params로 서버에 요청을 보내는 함수
  function sendAuthCodeToServer(authCode: string) {
    const url = `http://localhost:8000/auth/kakao/callback?code=${authCode}`;
    console.log("test!");

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //응답 토큰
        console.log("Access token received");
        const { bearerToken } = data.data;
        //토큰 저장
        storeLogin(bearerToken);
        navigate("/"); //로그인, 회원가입 완료되면 메인페이지로 이동
      })
      .catch((error) => {
        console.error("Failed to exchange auth code:", error);
      });
  }
  const authCode = getAuthCodeFromURL();
  if (authCode) {
    sendAuthCodeToServer(authCode);
  }

  return (
    <SpinnerDiv>
      <Spinner />
    </SpinnerDiv>
  );
};

export default RedirectPage;
