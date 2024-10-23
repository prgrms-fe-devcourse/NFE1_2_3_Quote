import { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import PROFILE from "@assets/images/profile.png";
import ProfileImgLightMode from "@assets/icons/profile_img_lightMode.svg?react";
import ProfileImgDarkMode from "@assets/icons/profile_img_darkMode.svg?react";
import ModifyUserNameButton from "@assets/icons/modify_userName_button.svg?react";

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
  max-width: 700px;
  background: #fff;
  border-radius: 16px;
  padding: 30px 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  color: #303030;
  font-weight: bold;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 15px;
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
  color: #a7a7a7;
  margin-top: 10px;
  display: block;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 0;
  cursor: text;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  padding-right: 80px;
  border: none;
  border-bottom: 1px solid #474040;
  outline: none;
  font-size: 16px;
  color: #303030;
  caret-color: #474040;

  &::placeholder {
    color: #a7a7a7;
  }
`;

const NicknameCounter = styled.span`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  font-size: 12px;
  color: #a7a7a7;
`;

const ModifyButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ErrorMessageWrapper = styled.div`
  height: 15px;
  margin-top: 5px;
`;

const ErrorMessage = styled.span`
  color: #d72121;
  font-size: 12px;
  display: block;
  text-align: left;
  margin-left: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const Button = styled.button`
  width: 40%;
  padding: 8px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #ffffff;
  border: 1px solid #474040;
  color: #474040;
`;

const SaveButton = styled(Button)`
  background-color: #474040;
  color: #fff;
`;

interface ProfileEditModalProps {
  onClose: () => void;
  showSuccessMessage: () => void;
  mode?: boolean;
}

const ProfileEditModal = ({
  onClose,
  showSuccessMessage,
  mode = false,
}: ProfileEditModalProps) => {
  const [imgSrc, setImgSrc] = useState(PROFILE);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImgSrc(reader.result as string);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("PNG 또는 JPEG 파일만 업로드할 수 있습니다.");
    }
  };

  const handleResetProfile = () => {
    setImgSrc(PROFILE);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    if (error) setError(null);
  };

  const handleSave = () => {
    if (nickname.trim().length === 0) {
      setError("1글자 이상 입력해주세요.");
    } else if (nickname.length > 8) {
      setError("닉네임은 8자 이내로 입력해주세요.");
    } else {
      onClose();
      showSuccessMessage();
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>프로필 수정</Title>
        <ProfileImageWrapper>
          <ProfileImage>
            <StyledImg
              src={imgSrc}
              alt='Profile'
            />
          </ProfileImage>
          <HiddenFileInput
            type='file'
            accept='image/png, image/jpeg'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <CameraIconWrapper onClick={openFilePicker}>
            {mode ? <ProfileImgDarkMode /> : <ProfileImgLightMode />}
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
            onChange={handleNicknameChange}
            ref={inputRef}
            autoFocus
          />
          <NicknameCounter>{nickname.length}/8</NicknameCounter>
          <ModifyButtonWrapper>
            <ModifyUserNameButton />
          </ModifyButtonWrapper>
        </InputWrapper>
        <ErrorMessageWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ErrorMessageWrapper>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SaveButton onClick={handleSave}>수정</SaveButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
