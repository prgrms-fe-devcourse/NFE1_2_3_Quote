import styled from "styled-components";

// Styled Components

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.34);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 400px;
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const ModalMessage = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
  color: #303030;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const CancelButton = styled.button`
  width: 40%;
  background-color: #fff;
  border: 1px solid #474040;
  color: #474040;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  width: 40%;
  background-color: #474040;
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  border: none;
`;

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ onClose, onConfirm }: DeleteModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>정말 탈퇴하시겠습니까?</ModalTitle>
        <ModalMessage>
          탈퇴하시면 게시글, 북마크 등 모든 활동 정보가 <br />
          삭제되며 복구되지 않습니다.
        </ModalMessage>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirm}>탈퇴</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteModal;
