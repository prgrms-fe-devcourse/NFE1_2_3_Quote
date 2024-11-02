import styled from "styled-components";
import ScrollUpButton from "@assets/icons/scrollUp_button.svg?react";
import { useEffect, useState } from "react";

const ScrollButtonContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.colorMainFont};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: calc(50% - 500px);
  bottom: 50px;
  z-index: 10;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.colorMainFont};
    width: 60%;
    height: 60%;
  }
`;

const ScrollButton = () => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    const showButton = () => {
      if (window.scrollY > 300) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", showButton);
    return () => {
      window.removeEventListener("scroll", showButton);
    };
  }, []);

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isScroll && (
        <ScrollButtonContainer onClick={moveToTop}>
          <ScrollUpButton />
        </ScrollButtonContainer>
      )}
    </>
  );
};

export default ScrollButton;
