import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadProfileImage,
  updateNickname,
  fetchUserProfile,
  checkNicknameAvailability,
} from "../apis/mypage";
import PROFILE from "@assets/images/profile.png";

interface UpdateProfileResponse {
  newImageUrl: string;
  updatedNickname: string;
}

export const useProfileEdit = (
  onUpdateProfile: (updatedImage: string, updatedNickname: string) => void,
  onClose: () => void,
) => {
  const [imgSrc, setImgSrc] = useState(PROFILE);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalNickname, setOriginalNickname] = useState("");
  const [nickname, setNickname] = useState("");
  const [checkedNickname, setCheckedNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const profile = await fetchUserProfile();
        setOriginalNickname(profile.nickname);
        setNickname(profile.nickname);
        setImgSrc(profile.profileImage || PROFILE);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadUserData();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !["image/png", "image/jpeg"].includes(file.type)) {
      alert("PNG 또는 JPEG 파일만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleResetProfile = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setImgSrc(PROFILE);
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const hasWhitespace = /\s/.test(value);
    const isValidLength = value.length <= 8;

    if (hasWhitespace || !isValidLength) {
      setError("닉네임은 공백 없이 8자 이내로 입력해주세요.");
      setSuccess(null);
      return;
    }

    setNickname(value);
    setCheckedNickname(null);
    setError(null);
    setSuccess(null);
  };

  const checkNicknameMutation = useMutation<void, Error, string>({
    mutationFn: async (nickname: string) => {
      await checkNicknameAvailability(nickname);
    },
    onSuccess: (_, variables) => {
      setCheckedNickname(variables);
      setSuccess("사용 가능한 닉네임입니다.");
      setError(null);
    },
    onError: () => {
      setError("이미 사용중인 닉네임입니다.");
    },
  });

  const handleNicknameCheck = () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    if (nickname === originalNickname) {
      setCheckedNickname(nickname);
      setSuccess("사용 가능한 닉네임입니다.");
      setError(null);
      return;
    }
    checkNicknameMutation.mutate(nickname);
  };

  const updateProfileMutation = useMutation<
    UpdateProfileResponse,
    Error,
    { newImageUrl: string; updatedNickname: string }
  >({
    mutationFn: async ({ updatedNickname }) => {
      if (selectedFile) {
        await uploadProfileImage(selectedFile);
      } else if (!imgSrc || imgSrc === PROFILE) {
        const response = await fetch(PROFILE);
        const blob = await response.blob();
        const defaultImageFile = new File([blob], "profile.png", {
          type: "image/png",
        });

        await uploadProfileImage(defaultImageFile);
      }

      if (updatedNickname !== originalNickname) {
        await updateNickname(updatedNickname);
      }

      return {
        newImageUrl: previewImage || imgSrc || PROFILE,
        updatedNickname,
      };
    },
    onSuccess: ({ newImageUrl, updatedNickname }) => {
      console.log("Profile update success:", newImageUrl);
      onUpdateProfile(newImageUrl, updatedNickname);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      onClose();
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
      setError("프로필 수정에 실패했습니다.");
    },
  });

  const handleSave = () => {
    if (checkedNickname !== nickname) {
      setError("닉네임 중복 검사를 완료해주세요.");
      return;
    }

    const newImageUrl = previewImage || imgSrc;

    updateProfileMutation.mutate({
      newImageUrl,
      updatedNickname: nickname,
    });
  };

  const handleCancel = () => {
    setNickname(originalNickname);
    setCheckedNickname(null);
    setError(null);
    setSuccess(null);
    onClose();
  };

  return {
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
  };
};
