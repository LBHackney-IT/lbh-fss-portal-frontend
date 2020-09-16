import React from "react";
import styled from "styled-components";
import { grey, blue } from "../../../../settings";

const StyledNav = styled.div`
  width: 100%;
`;

const StyledNavContent = styled.div`
  display: flex;
  padding: 5px;
  margin: 10px 0;
`;
const StyledNavIndexContainer = styled.div`
  width: 15%;
`;
const StyledNavIndex = styled.div`
  width: 2em;
  height: 2em;
  box-sizing: initial;
  border: 1px solid black;
  color: black;
  text-align: center;
  border-radius: 50%;
  line-height: 2em;
  margin: 0 auto;
`;

const StyledNavText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  text-align: left;
  width: 85%;
`;

const StyledButton = styled.button`
  width: 90%;
  margin: 0 auto;
  border: 0;
  border-bottom: 1px solid ${grey[700]};
  width: 100%;
  background-color: white;
  &:focus {
    outline: none;
  }
`;

const StyledActiveButton = styled(StyledButton)`
  color: ${blue[400]};
  cursor: pointer;
`;

const OrganisationFormStep = ({ stepNum, label }) => {
  return (
    <StyledNavContent>
      <StyledNavIndexContainer>
        <StyledNavIndex>{stepNum + 1}</StyledNavIndex>{" "}
      </StyledNavIndexContainer>
      <StyledNavText style={{ width: "85%" }}>
        <p style={{ margin: 0 }}>{label}</p>
      </StyledNavText>
    </StyledNavContent>
  );
};

const OrganisationFormNavItem = ({ stepNum, label, isLink, onClick }) => {
  return isLink ? (
    <StyledActiveButton onClick={onClick}>
      <OrganisationFormStep stepNum={stepNum} label={label} />
    </StyledActiveButton>
  ) : (
    <StyledButton>
      <OrganisationFormStep stepNum={stepNum} label={label} />
    </StyledButton>
  );
};

const OrganisationFormNav = ({
  stepArray,
  stepNum,
  setStepNum,
  enableAllLinks = false,
}) => {
  return (
    <StyledNav>
      {stepArray.map((s, i) => (
        <OrganisationFormNavItem
          key={s.id}
          stepNum={i}
          label={s.label}
          isLink={enableAllLinks || stepNum > i}
          onClick={() => setStepNum(i)}
        />
      ))}
    </StyledNav>
  );
};

export default OrganisationFormNav;
