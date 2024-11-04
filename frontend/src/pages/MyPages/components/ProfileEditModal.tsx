import styled, { useTheme } from "styled-components";
import ProfileImgLightMode from "@assets/icons/profile_img_lightMode.svg?react";
import ProfileImgDarkMode from "@assets/icons/profile_img_darkMode.svg?react";
import { useProfileEdit } from "../hooks/useProfileEdit";

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
  overflow: hidden;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 650px;
  height: 420px;
  background: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 16px;
  padding: 20px 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colorMainFont};
  font-weight: bold;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 10px;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const LabelContainer = styled.div`
  display: inline-block;
  pointer-events: auto;
`;

const Label = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colorSubFont};
  margin-bottom: 10px;
  display: block;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  cursor: text;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  padding-right: 80px;
  border: none;
  border-bottom: 0.7px solid ${({ theme }) => theme.colorButton};
  outline: none;
  font-size: 15px;
  color: ${({ theme }) => theme.colorMainFont};
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  caret-color: ${({ theme }) => theme.colorButton};

  &::placeholder {
    color: ${({ theme }) => theme.colorSubFont};
  }
`;

const NicknameCounter = styled.span`
  position: absolute;
  top: 50%;
  right: 80px;
  transform: translateY(-50%);
  font-size: 12px;
  color: ${({ theme }) => theme.colorSubFont};
`;

const ModifyButtonWrapper = styled.button`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colorSub};
  color: ${({ theme }) => theme.colorButton};
  border: 1px solid ${({ theme }) => theme.colorButton};
  border-radius: 30px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colorMain};
    color: #ffffff;
    transform: translateY(-50%) scale(1.05);
  }
`;

const ErrMsgCommonStyle = styled.span`
  height: 15px;
  font-size: 12px;
  display: block;
  text-align: start;
  margin-left: 8px;
`;
const ErrMsgContainer = styled.div`
  height: 15px;
  margin: 5px 0;
`;
const ErrorMessage = styled(ErrMsgCommonStyle)`
  color: ${({ theme }) => theme.colorValidation};
`;

const SuccessMessage = styled(ErrMsgCommonStyle)`
  color: #28a745;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const Button = styled.button`
  width: 35%;
  height: 35px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  border: 1px solid ${({ theme }) => theme.colorButton};
  color: ${({ theme }) => theme.colorButton};
`;

const SaveButton = styled(Button)`
  background-color: ${({ theme }) => theme.colorMain};
  color: #fff;
  border: ${({ theme }) => theme.colorSub};
`;

interface ProfileEditModalProps {
  onClose: () => void;
  onUpdateProfile: (updatedImage: string, updatedNickname: string) => void;
}

const ProfileEditModal = ({
  onClose,
  onUpdateProfile,
}: ProfileEditModalProps) => {
  const {
    imgSrc,
    previewImage,
    nickname,
    success,
    error,
    handleFileChange,
    handleResetProfile,
    handleNicknameChange,
    handleNicknameCheck,
    handleSave,
    handleCancel,
    fileInputRef,
  } = useProfileEdit(onUpdateProfile, onClose);

  const theme = useTheme();

  return (
    <ModalOverlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>프로필 수정</Title>
        <ProfileImageWrapper>
          <ProfileImage>
            <StyledImg
              src={
                previewImage || `${imgSrc}?timestamp=${new Date().getTime()}`
              }
              alt='Profile'
            />
          </ProfileImage>
          <HiddenFileInput
            type='file'
            accept='image/png, image/jpeg'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <CameraIconWrapper onClick={() => fileInputRef.current?.click()}>
            {theme.mode === "lightMode" ? (
              <ProfileImgLightMode />
            ) : (
              <ProfileImgDarkMode />
            )}
          </CameraIconWrapper>
        </ProfileImageWrapper>
        <LabelContainer>
          <Label onClick={handleResetProfile}>기본 프로필로 변경</Label>
        </LabelContainer>
        <InputWrapper>
          <Input
            type='text'
            placeholder='닉네임 입력'
            value={nickname}
            onChange={(e) => {
              if (e.target.value.length <= 8) {
                handleNicknameChange(e);
              }
            }}
            autoFocus
          />
          <NicknameCounter>{nickname.length}/8</NicknameCounter>
          <ModifyButtonWrapper onClick={handleNicknameCheck}>
            중복확인
          </ModifyButtonWrapper>
        </InputWrapper>
        <ErrMsgContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </ErrMsgContainer>
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <SaveButton onClick={handleSave}>수정</SaveButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
