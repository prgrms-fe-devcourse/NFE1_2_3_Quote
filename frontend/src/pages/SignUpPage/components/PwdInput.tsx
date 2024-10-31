import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import PwdHideEye from "@assets/icons/pwd_hideEye.svg?react";
import PwdShowEye from "@assets/icons/pwd_showEye.svg?react";

const InputDiv = styled.div`
  margin-bottom: 20px;
`;
const InputStyle = styled.input`
  width: 400px;
  height: 46px;
  font-size: 14px;
  outline-style: none;
  border-radius: 10px;
  border: 0.9px solid
    ${({ theme }) => (theme.mode === "lightMode" ? "black" : theme.colorButton)};
  padding: 14px 35px 14px 16px;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px
      ${({ theme }) =>
        theme.mode === "lightMode" ? "white" : theme.colorBackground}
      inset;
    -webkit-text-fill-color: ${({ theme }) =>
      theme.mode === "lightMode" ? "black" : theme.colorButton};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  //password타입일 때 글꼴때문에 입력되는 것이 안 보여서 글꼴 수정
  &[type="password"] {
    font-family: Arial, Helvetica, sans-serif;
  }
  &::placeholder {
    font-family: "NanumSquareRegular";
  }
  background-color: ${({ theme }) =>
    theme.mode === "lightMode" ? "white" : theme.colorBackground};
  caret-color: ${({ theme }) =>
    theme.mode === "lightMode" ? "black" : theme.colorButton};
  color: ${({ theme }) =>
    theme.mode === "lightMode" ? "black" : theme.colorButton};
`;
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colorValidation};
  font-size: 12px;
  margin: 6px 0 0 10px;
`;
const EyeContainer = styled.div`
  width: 22px;
  cursor: pointer;
  position: absolute;
  z-index: 10;
  right: 7px;
  display: flex;
  align-items: center;
  top: 15px;
`;

interface InputProps {
  password: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errMsg?: string;
}

const PwdInput = ({ password, handleChange, errMsg }: InputProps) => {
  const [showPwd, setShowPwd] = useState<boolean>(false);

  return (
    <InputDiv
      style={{
        position: "relative",
      }}
    >
      <InputStyle
        type={showPwd ? "text" : "password"}
        placeholder='비밀번호 입력(영문, 숫자, 특수문자 포함 8~15자)'
        name='password'
        value={password}
        onChange={handleChange}
        required
      />
      {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
      <EyeContainer onClick={() => setShowPwd(!showPwd)}>
        {showPwd ? <PwdShowEye /> : <PwdHideEye />}
      </EyeContainer>
    </InputDiv>
  );
};

export default PwdInput;
