import styled, { keyframes } from "styled-components";

// Styled Components

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const StyledAlertPopup = styled.div<{ $error: boolean }>`
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colorSub};
  color: ${({ $error, theme }) =>
    $error ? theme.colorValidation : theme.colorMainFont};
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: bold;
  z-index: 10;
  pointer-events: none;
  opacity: 1;
  animation: ${fadeOut} 0.5s ease-in-out 1s forwards;
`;

// Alert PopUp

interface AlertPopUpProps {
  children: string;
  error?: boolean;
}

const AlertPopUp = ({ children, error }: AlertPopUpProps) => {
  return (
    <>
      <StyledAlertPopup $error={error || false}>{children}</StyledAlertPopup>
    </>
  );
};

export default AlertPopUp;
