import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as DownArrow } from "./icons/down-arrow.svg";
import SVGIcon from "../SVGIcon/SVGIcon";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

const StyledMainContainer = styled.div`
  position: relative;
  display: inline;
  ${breakpoint("md")`
    display: block;
  `};
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  border: 1px solid #000000;
  box-shadow: 4px 4px 4px rgba(0, 30, 58, 0.05);
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  ${breakpoint("md")`
    padding: 5px;
  `};
`;

const StyledHeaderOutsideList = styled(StyledHeader)`
  display: ${(props) => (props.isOpen ? "none" : "inline")};
  ${breakpoint("md")`
    display: flex;
  `};
`;

const StyledHeaderInList = styled(StyledHeader)`
  box-shadow: 0 0 0 0;
  padding: 0;
  border: 1px solid transparent;
  ${breakpoint("md")`
    font-weight: 600;
  `};
`;

const StyledContainer = styled.div`
  z-index: 100;
  background: white;
  position: absolute;
  top: -5px;
  left: 0;
  width: 160px;
  ${breakpoint("md")`
    top: 0;
    left: auto;
    right: 0;
  `};
`;

const StyledDropDownList = styled.ul`
  background: white;
  border: 1px solid #000000;
  box-shadow: 4px 4px 4px rgba(0, 30, 58, 0.05);
  border-radius: 2px;
  padding: 5px;
  margin: 0;
`;

const StyledAction = styled.div`
  padding: 7px 5px;
  cursor: pointer;
`;

function TableActionDropDown({ actions }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <StyledMainContainer>
        <StyledHeaderOutsideList onClick={toggleDropDown} isOpen={isOpen}>
          Select{" "}
          <SVGIcon SVGComponent={DownArrow} width={"15px"} height={"15px"} />{" "}
        </StyledHeaderOutsideList>
        {isOpen && (
          <>
            <StyledContainer>
              <StyledDropDownList>
                <StyledHeaderInList onClick={toggleDropDown} isOpen={isOpen}>
                  Select{" "}
                  <SVGIcon
                    SVGComponent={DownArrow}
                    width={"15px"}
                    height={"15px"}
                  />{" "}
                </StyledHeaderInList>
                {actions.map((action, index) => {
                  return (
                    <StyledAction onClick={action.onClick} key={index}>
                      <SVGIcon
                        SVGComponent={action.icon}
                        width={"15px"}
                        height={"15px"}
                      />{" "}
                      {action.title}
                    </StyledAction>
                  );
                })}
              </StyledDropDownList>
            </StyledContainer>
          </>
        )}
      </StyledMainContainer>
    </>
  );
}

export default TableActionDropDown;
