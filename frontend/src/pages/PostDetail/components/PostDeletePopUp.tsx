import styled from "styled-components";
import { useState } from "react";
import useDeletePost from "../hooks/useDeletePost";
import { useTheme } from "styled-components";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";

const PopUpContainer = styled.div`
  width: 400px;
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
`;

const PopUpTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const PopUpButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PopUpCancelButton = styled.button`
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

const PopUpConfirmButton = styled.button`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorMain};
  font-size: 14px;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  margin: 14px 7px;
  &:hover {
    cursor: pointer;
  }
`;

interface DeletePopUpProps {
  showPopUp: boolean;
  setShowPopUp: (value: boolean) => void;
  postId: string;
}

const PostDeletePopUp = ({
  showPopUp,
  setShowPopUp,
  postId,
}: DeletePopUpProps) => {
  const theme = useTheme();
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(false);

  const { mutate } = useDeletePost(setDeleteSuccessMsg);
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
          <PopUpCancelButton onClick={() => setShowPopUp(!showPopUp)}>
            취소
          </PopUpCancelButton>
          <PopUpConfirmButton
            onClick={handleConfirmDelete}
            disabled={btnDisabled}
          >
            확인
          </PopUpConfirmButton>
        </PopUpButtonContainer>
        {deleteSuccessMsg && <AlertPopUp>글이 삭제되었습니다.</AlertPopUp>}
      </PopUpContainer>
    </>
  );
};

export default PostDeletePopUp;
