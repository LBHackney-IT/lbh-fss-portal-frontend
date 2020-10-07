import React, { useState } from "react";
import styled from "styled-components";
import { grey, blue } from "../../settings";
import RaisedCard from "../../components/RaisedCard/RaisedCard";
import { breakpoint } from "../..//utils/breakpoint/breakpoint";
import { ReactComponent as ArrowDown } from "./icons/down-arrow.svg";
import SVGIcon from "../../components/SVGIcon/SVGIcon";

const StyledNav = styled.div`
  width: 100%;
`;

const StyledNavContent = styled.div`
  display: flex;
  padding: 5px;
  margin: 5px 0;
  width: 100%;
  ${breakpoint("sm")`
    width: 90%
  `};
  ${breakpoint("md")`
    margin: 10px 0;
    width: 100%;
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

const StyledNavDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  text-align: left;
  width: 90%;
  ${breakpoint("md")`
    width: 85%;
  `};
`;

const StyledNavText = styled.p`
  margin: 0 0 0 10px;
  ${breakpoint("md")`
    margin: 0;
  `};
`;

const StyledButton = styled.button`
  margin: 0 auto;
  border: 0;
  border-bottom: ${(props) =>
    props.isLast ? "none" : `1px solid ${grey[202]}`};
  width: 100%;
  background-color: white;
  &:focus {
    outline: none;
  }

  display: ${(props) => (props.showAllItems ? "block" : "none")};
  ${breakpoint("sm")`
    display: block;
  `};
`;

const StyledLinkButton = styled(StyledButton)`
  color: ${blue[400]};
  cursor: pointer;
`;

const StyledActiveButton = styled(StyledButton)`
  color: ${blue[400]};
  font-weight: bold;

  display: block;
  border-bottom: ${(props) =>
    props.showAllItems ? `border-bottom: 1px solid ${grey[202]}` : "none"};
  cursor: pointer;
  ${breakpoint("sm")`
    cursor: default;
    border-bottom: 1px solid ${grey[202]};
  `};
`;

const StyledIconContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;

  ${breakpoint("sm")`
    display: none;
  `};
`;

const OrganisationFormStep = ({ stepNum, label }) => {
  return (
    <StyledNavContent>
      <StyledNavIndexContainer>
        <StyledNavIndex>{stepNum + 1}</StyledNavIndex>{" "}
      </StyledNavIndexContainer>
      <StyledNavDiv>
        <StyledNavText>{label}</StyledNavText>
      </StyledNavDiv>
    </StyledNavContent>
  );
};

const OrganisationFormNavItem = ({
  stepNum,
  label,
  isLink,
  isActive,
  isLast,
  onClick,
  showAllItems,
  setShowAllItems,
}) => {
  if (isActive) {
    return (
      <StyledActiveButton
        showAllItems={showAllItems}
        onClick={() => setShowAllItems(!showAllItems)}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <OrganisationFormStep stepNum={stepNum} label={label} />
          <StyledIconContainer>
            <SVGIcon SVGComponent={ArrowDown} width={"21px"} height={"21px"} />
          </StyledIconContainer>
        </div>
      </StyledActiveButton>
    );
  }
  return isLink ? (
    <StyledLinkButton onClick={onClick} showAllItems={showAllItems}>
      <OrganisationFormStep stepNum={stepNum} label={label} />
    </StyledLinkButton>
  ) : (
    <StyledButton showAllItems={showAllItems} isLast={isLast}>
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
  const [showAllItems, setShowAllItems] = useState(false);

  console.log("stepArray");
  console.log(stepArray);
  console.log(stepArray.length);

  return (
    <RaisedCard backgroundColor={"white"} padding={"10px 5px 10px 5px"}>
      <StyledNav>
        {stepArray.map((s, i) => (
          <OrganisationFormNavItem
            key={s.id}
            stepNum={i}
            label={s.label}
            isLink={enableAllLinks || stepNum > i}
            isActive={stepNum === i}
            isLast={stepArray.length === i + 1}
            onClick={() => {
              setShowHiddenField(showHiddenFieldSnapshot);
              setStepNum(i);
            }}
            showAllItems={showAllItems}
            setShowAllItems={setShowAllItems}
          />
        ))}
      </StyledNav>
    </RaisedCard>
  );
};

export default FormNav;
