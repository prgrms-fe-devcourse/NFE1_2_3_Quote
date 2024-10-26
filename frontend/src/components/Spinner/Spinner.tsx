import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }

`;
const StyledSpinner = styled.div`
  border: 4px solid #a7a7a7;
  border-top: 4px solid #474040;
  border-radius: 50%;
  height: 30px;
	width: 30px;
  margin: auto;
  animation: ${rotation} 1s linear infinite;
`;

const Spinner = () => {
  return (
    <>
      <StyledSpinner />
    </>
  );
};

export default Spinner;
