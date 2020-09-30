import React from "react";
import styled from "styled-components";
import { grey, blue } from "../../settings";
import RaisedCard from "../../components/RaisedCard/RaisedCard";
import { breakpoint } from "../..//utils/breakpoint/breakpoint";

const StyledNav = styled.div`
  width: 100%;
`;

const StyledNavContent = styled.div`
  display: flex;
  padding: 5px;
  margin: 5px 0;
  ${breakpoint("md")`
    margin: 10px 0;
  `};
`;
const StyledNavIndexContainer = styled.div`
  width: 10%;
  ${breakpoint("md")`
    width: 15%;
  `};
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
  width: 90%;
  ${breakpoint("md")`
    width: 85%;
  `};
`;

const StyledButton = styled.button`
  width: 90%;
  margin: 0 auto;
  border: 0;
  border-bottom: 1px solid ${grey[202]};
  width: 100%;
  background-color: white;
  &:focus {
    outline: none;
  }
`;

const StyledLinkButton = styled(StyledButton)`
  color: ${blue[400]};
  cursor: pointer;
`;

const StyledActiveButton = styled(StyledButton)`
  color: ${blue[400]};
  font-weight: bold;
`;

const OrganisationFormStep = ({ stepNum, label }) => {
  return (
    <StyledNavContent>
      <StyledNavIndexContainer>
        <StyledNavIndex>{stepNum + 1}</StyledNavIndex>{" "}
      </StyledNavIndexContainer>
      <StyledNavText>
        <p style={{ margin: 0 }}>{label}</p>
      </StyledNavText>
    </StyledNavContent>
  );
};

const OrganisationFormNavItem = ({
  stepNum,
  label,
  isLink,
  isActive,
  onClick,
}) => {
  if (isActive) {
    return (
      <StyledActiveButton>
        <OrganisationFormStep stepNum={stepNum} label={label} />
      </StyledActiveButton>
    );
  }
  return isLink ? (
    <StyledLinkButton onClick={onClick}>
      <OrganisationFormStep stepNum={stepNum} label={label} />
    </StyledLinkButton>
  ) : (
    <StyledButton>
      <OrganisationFormStep stepNum={stepNum} label={label} />
    </StyledButton>
  );
};

const FormNav = ({
  stepArray,
  stepNum,
  setStepNum,
  enableAllLinks = false,
  setShowHiddenField,
  showHiddenFieldSnapshot,
}) => {
  return (
    <RaisedCard backgroundColor={"white"} padding={"10px 5px 30px 5px"}>
      <StyledNav>
        {stepArray.map((s, i) => (
          <OrganisationFormNavItem
            key={s.id}
            stepNum={i}
            label={s.label}
            isLink={enableAllLinks || stepNum > i}
            isActive={stepNum === i}
            onClick={() => {
              setShowHiddenField(showHiddenFieldSnapshot);
              setStepNum(i);
            }}
          />
        ))}
      </StyledNav>
    </RaisedCard>
  );
};

export default FormNav;
