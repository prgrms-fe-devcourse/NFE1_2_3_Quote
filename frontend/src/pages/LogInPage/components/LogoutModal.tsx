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
  width: 400px;
  padding: 30px 65px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const ButtonContainer = styled.div`
  width: 265px;
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  width: 125px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #474040;
  color: #474040;
  cursor: pointer;
  font-size: 14px;
`;
const Message = styled.p`
  color: #474040;
  font-size: 16px;
  margin-bottom: 30px;
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
    if (isLogin) {
      //로그인 상태(버튼이 로그아웃)일 때 로그아웃
      storeLogout();
      console.log("Logout Success");
    }

    if (location.pathname !== "/") {
      navigate("/");
    } else {
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <Modal>
        <Message>로그아웃 하시겠습니까?</Message>

        <ButtonContainer>
          <Button onClick={onClose}>취소</Button>
          <Button
            style={{ backgroundColor: "#474040", color: "#ffffff" }}
            onClick={userLogout}
          >
            확인
          </Button>
        </ButtonContainer>
      </Modal>
    </ModalOverlay>
  );
};

export default LogoutModal;
