import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "styled-components";

const PopUpContainer = styled.div`
  width: 360px;
  height: 200px;
  position: absolute;
  display: flex;
  top: 240px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 20px;
  padding: 35px 50px;
  z-index: 10;
`;

const PopUpTitle = styled.p`
  font-size: 16px;
`;

const PopUpButtonContainer = styled.div`
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
const PopUpCancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  color: ${({ theme }) => theme.colorCancelPopUPBtnFont};
  border: 1px solid ${({ theme }) => theme.colorCancelPopUPBtnFont};
`;
const PopUpConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colorMain};
  color: #ffffff;
  border: none;
`;

interface CancelPopUpProps {
  modify: boolean;
  showCancelPopUp: boolean;
  setShowCancelPopUp: (value: boolean) => void;
}

const CancelPopUp = ({
  modify,
  showCancelPopUp,
  setShowCancelPopUp,
}: CancelPopUpProps) => {
  const theme = useTheme();
  const handlePopUpCancel = () => {
    setShowCancelPopUp(!showCancelPopUp);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handlePopUpConfirm = () => {
    if (modify) {
      return navigate(-1);
    }
    if (location.state.from === "main") {
      return navigate("/");
    }
    if (location.state.from === "myPage") {
      return navigate("/mypage");
    }
    if (location.state.from === "userPage") {
      return navigate(`/user-page/${location.state.id}`);
    }
  };

  return (
    <>
      <PopUpContainer
        style={{
          boxShadow: theme.mode == "lightMode" ? "0px 0px 6px #dfdfdf" : "none",
        }}
      >
        <PopUpTitle>
          {modify
            ? "글 수정을 취소하시겠습니까?"
            : "글 작성을 취소하시겠습니까?"}
        </PopUpTitle>
        <PopUpButtonContainer>
          <PopUpCancelButton onClick={handlePopUpCancel}>
            취소
          </PopUpCancelButton>
          <PopUpConfirmButton onClick={handlePopUpConfirm}>
            확인
          </PopUpConfirmButton>
        </PopUpButtonContainer>
      </PopUpContainer>
    </>
  );
};

export default CancelPopUp;
