import styled from "styled-components";
import { useState } from "react";
import useDeletePost from "../hooks/useDeletePost";
import { useEffect } from "react";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.34);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const PopUpContainer = styled.div`
  width: 360px;
  height: 200px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 20px;
  z-index: 12;
`;

const PopUpTitle = styled.p`
  font-size: 16px;
`;

const PopUpButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 125px;
  height: 35px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 14px 7px;
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

interface DeletePopUpProps {
  showPopUp: boolean;
  setShowPopUp: (value: boolean) => void;
  postId: string;
  form: string;
}

const PostDeletePopUp = ({
  showPopUp,
  setShowPopUp,
  postId,
  form,
}: DeletePopUpProps) => {

  const { mutate } = useDeletePost(form);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleConfirmDelete = () => {
    setBtnDisabled(true);
    mutate(postId);
  };

  useEffect(() => {
    if (showPopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopUp]);

  return (
    <PopupOverlay>
      <PopUpContainer>
        <PopUpTitle>글을 삭제하시겠습니까?</PopUpTitle>
        <PopUpButtonContainer>
          <PopUpCancelButton
            disabled={btnDisabled}
            onClick={() => setShowPopUp(!showPopUp)}
          >
            취소
          </PopUpCancelButton>
          <PopUpConfirmButton
            onClick={handleConfirmDelete}
            disabled={btnDisabled}
          >
            확인
          </PopUpConfirmButton>
        </PopUpButtonContainer>
      </PopUpContainer>
    </PopupOverlay>
  );
};

export default PostDeletePopUp;
