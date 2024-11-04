import styled from "styled-components";
import { useState } from "react";
import useDeletePost from "../hooks/useDeletePost";
import { useTheme } from "styled-components";

const PopUpContainer = styled.div`
  width: 360px;
  height: 200px;
  position: absolute;
  display: flex;
  top: 220px;
  left: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 20px;
  z-index: 10;
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
  const theme = useTheme();

  const { mutate } = useDeletePost(form);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleConfirmDelete = () => {
    setBtnDisabled(true);
    mutate(postId);
  };

  return (
    <>
      <PopUpContainer
        style={{
          boxShadow: theme.mode == "lightMode" ? "0px 0px 6px #dfdfdf" : "none",
        }}
      >
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
    </>
  );
};

export default PostDeletePopUp;
