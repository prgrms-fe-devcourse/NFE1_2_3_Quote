import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "styled-components";

const PopUpContainer = styled.div`
  width: 400px;
  height: 200px;
  position: absolute;
  display: flex;
  top: 240px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 20px;
`;

const PopUpTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const PopUpButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PopUpCancelButton = styled.p`
  width: 120px;
  height: 40px;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colorCancelPopUPBtnFont};
  border: 1px solid ${({ theme }) => theme.colorCancelPopUPBtnFont};
  border-radius: 30px;
  margin: 14px 7px;
  &:hover {
    cursor: pointer;
  }
`;

const PopUpConfirmButton = styled.p`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorMain};
  font-size: 14px;
  color: #ffffff;
  border-radius: 30px;
  margin: 14px 7px;
  &:hover {
    cursor: pointer;
  }
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
