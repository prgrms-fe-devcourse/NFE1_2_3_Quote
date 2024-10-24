import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PopUpContainer = styled.div`
  width: 400px;
  height: 200px;
  position: absolute;
  display: flex;
  top: 240px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 6px #dfdfdf;
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
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #474040;
  border: 1px solid #474040;
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
  background-color: #474040;
  font-size: 14px;
  color: #ffffff;
  border-radius: 30px;
  margin: 14px 7px;
  &:hover {
    cursor: pointer;
  }
`;

interface CancelPopUpProps {
  showCancelPopUp: boolean;
  setShowCancelPopUp: (value: boolean) => void;
}

const CancelPopUp = ({
  showCancelPopUp,
  setShowCancelPopUp,
}: CancelPopUpProps) => {
  const handlePopUpCancel = () => {
    setShowCancelPopUp(!showCancelPopUp);
  };
  const navigate = useNavigate();
  const handlePopUpConfirm = () => {
    navigate("/");
  };
  return (
    <>
      <PopUpContainer>
        <PopUpTitle>글 작성을 취소하시겠습니까?</PopUpTitle>
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
