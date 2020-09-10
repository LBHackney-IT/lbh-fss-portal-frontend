import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as DownArrow } from "./icons/down-arrow.svg";
import { ReactComponent as ApproveCircle } from "./icons/approve-circle.svg";
import { ReactComponent as DeclineCircle } from "./icons/decline-circle.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";
import SVGIcon from "../SVGIcon/SVGIcon";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

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
  display: ${(props) => (props.isOpen ? "none" : "flex")};
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
  ${breakpoint("md")`
    position: absolute;
    top: 10px;
    right: 10px;
    margin:-10px;
    width: 10.5em;
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

function FormDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div style={{ position: "relative" }}>
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
                <StyledAction>
                  <SVGIcon
                    SVGComponent={ApproveCircle}
                    width={"15px"}
                    height={"15px"}
                  />{" "}
                  Approve
                </StyledAction>
                <StyledAction onClick={() => alert("decline")}>
                  <SVGIcon
                    SVGComponent={DeclineCircle}
                    width={"15px"}
                    height={"15px"}
                  />{" "}
                  Decline
                </StyledAction>
                <StyledAction>
                  <SVGIcon
                    SVGComponent={Trash}
                    width={"15px"}
                    height={"15px"}
                  />{" "}
                  Remove
                </StyledAction>
              </StyledDropDownList>
            </StyledContainer>
          </>
        )}
      </div>
    </>
  );
}

export default FormDropDown;
