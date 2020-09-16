import React from "react";
import styled from "styled-components";
import { grey } from "../../../../settings";

const StyledNav = styled.div`
  width: 100%;
  /* margin: 10px 10px 40px 10px; */
`;

const StyledNavContent = styled.div`
  display: flex;
  padding: 5px;
`;

const StyledNavIndex = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  border-radius: 50px;
  padding: 2px;
`;

const StyledNavText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  text-align: left;
`;

const StyledButton = styled.button`
  border: 0;
  border-bottom: 1px solid ${grey[700]};
  width: 100%;
  background-color: white;
`;

const StyledActiveButton = styled(StyledButton)`
  background-color: grey;
`;

const OrganisationFormStep = ({ stepNum, label }) => {
  return (
    <StyledNavContent>
      <StyledNavIndex>{stepNum + 1}</StyledNavIndex>{" "}
      <StyledNavText>
        <p style={{ margin: 0 }}>{label}</p>
      </StyledNavText>
    </StyledNavContent>
  );
};

const OrganisationFormNavItem = ({ stepNum, label, isLink, onClick }) => {
  return isLink ? (
    <StyledActiveButton style={{ width: "100%" }} onClick={onClick}>
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
