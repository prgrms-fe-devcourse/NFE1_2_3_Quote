import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.34);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Modal = styled.div`
  width: 360px;
  height: 200px;
  padding: 35px 50px;
  background: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const ButtonContainer = styled.div`
  width: 265px;
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  width: 125px;
  height: 35px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
`;
const CancelBtn = styled(Button)`
  color: ${({ theme }) => theme.colorButton};
  border: 1px solid ${({ theme }) => theme.colorButton};
  background-color: transparent;
`;
const ConfirmBtn = styled(Button)`
  background-color: ${({ theme }) => theme.colorMain};
  color: ${({ theme }) =>
    theme.mode === "lightMode" ? "#ffffff" : theme.colorMainFont};
  border: none;
`;
const Message = styled.p`
  color: ${({ theme }) => theme.colorButton};
  font-size: 16px;
`;

type LogoutModal = {
  isModalOpen: boolean;
  onClose: () => void;
};

const LogoutModal = ({ isModalOpen, onClose }: LogoutModal) => {
  const { isLogin, storeLogout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isModalOpen) {
    return null;
  }

  const userLogout = () => {
    //로그인 상태(버튼이 로그아웃)일 때 로그아웃
    if (isLogin) {
      storeLogout();
      console.log("Logout Success");
    }

    if (location.pathname !== "/") {
      navigate("/");
    } else {
      onClose();
    }
    window.location.reload();
  };

  return (
    <ModalOverlay>
      <Modal>
        <Message>로그아웃 하시겠습니까?</Message>

        <ButtonContainer>
          <CancelBtn onClick={onClose}>취소</CancelBtn>
          <ConfirmBtn onClick={userLogout}>확인</ConfirmBtn>
        </ButtonContainer>
      </Modal>
    </ModalOverlay>
  );
};

export default LogoutModal;
