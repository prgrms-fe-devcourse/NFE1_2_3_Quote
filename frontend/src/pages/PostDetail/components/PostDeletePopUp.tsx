import styled, { keyframes } from "styled-components";
import { useState } from "react";
import useDeletePost from "../hooks/useDeletePost";

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

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 70px;
  width: 260px;
  height: 45px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #393939;
  font-size: 16px;
  font-weight: bold;
  background-color: #fff;
  box-shadow: 0px 0px 6px #dfdfdf;
  border-radius: 10px;
  animation: ${fadeOut} 2s ease-in-out 1s forwards;
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
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(false);

  const { mutate } = useDeletePost(setDeleteSuccessMsg);

  const handleConfirmDelete = () => {
    mutate(postId);
  };

  return (
    <>
      <PopUpContainer>
        <PopUpTitle>글을 삭제하시겠습니까?</PopUpTitle>
        <PopUpButtonContainer>
          <PopUpCancelButton onClick={() => setShowPopUp(!showPopUp)}>
            취소
          </PopUpCancelButton>
          <PopUpConfirmButton onClick={handleConfirmDelete}>
            확인
          </PopUpConfirmButton>
        </PopUpButtonContainer>
        {deleteSuccessMsg && (
          <SuccessMessage>글이 삭제되었습니다.</SuccessMessage>
        )}
      </PopUpContainer>
    </>
  );
};

export default PostDeletePopUp;
