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
  border: ${(props) =>
    props.isOpen ? "1px solid transparent" : "1px solid #000000"};
  box-shadow: ${(props) =>
    props.isOpen ? "0 0 0 0" : "4px 4px 4px rgba(0, 30, 58, 0.05)"};
  border-radius: 2px;
  padding: ${(props) => (props.isOpen ? "0" : "5px")};
  ${breakpoint("md")`
    font-weight: ${(props) => (props.isOpen ? "600" : "normal")};
    padding: 5px;
  `};
`;

// const StyledHeaderMain

const StyledHeaderInList = styled(StyledHeader)`
  box-shadow: 0 0 0 0;
`;

const DropDownHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  background: white;
  border: ${(props) =>
    props.isOpen ? "1px solid transparent" : "1px solid #000000"};
  box-shadow: ${(props) =>
    props.isOpen ? "0 0 0 0" : "4px 4px 4px rgba(0, 30, 58, 0.05)"};
  border-radius: 2px;
  padding: ${(props) => (props.isOpen ? "0" : "5px")};
  ${breakpoint("md")`
    font-weight: ${(props) => (props.isOpen ? "600" : "normal")};
    padding: 5px;
  `};
`;

const DropDownListContainer = styled("div")`
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

const DropDownList = styled("ul")`
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
        <DropDownHeader onClick={toggleDropDown}>
          Select{" "}
          <SVGIcon SVGComponent={DownArrow} width={"15px"} height={"15px"} />{" "}
        </DropDownHeader>
        {isOpen && (
          <>
            <DropDownListContainer>
              <DropDownList>
                <DropDownHeader onClick={toggleDropDown} isOpen={isOpen}>
                  Select{" "}
                  <SVGIcon
                    SVGComponent={DownArrow}
                    width={"15px"}
                    height={"15px"}
                  />{" "}
                </DropDownHeader>
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
              </DropDownList>
            </DropDownListContainer>
          </>
        )}
      </div>
    </>
  );
}

export default FormDropDown;

// {!isOpen ? (
//     <DropDownHeader onClick={toggleDropDown} isOpen={isOpen}>
//       Select{" "}
//       <SVGIcon SVGComponent={DownArrow} width={"15px"} height={"15px"} />{" "}
//     </DropDownHeader>
//   ) : (
//     <>
//       <DropDownHeader style={{ visibility: "hidden" }}>
//         Select{" "}
//         <SVGIcon
//           SVGComponent={DownArrow}
//           width={"15px"}
//           height={"15px"}
//         />{" "}
//       </DropDownHeader>

//       <DropDownListContainer>
//         <DropDownList>
//           <DropDownHeader onClick={toggleDropDown} isOpen={isOpen}>
//             Select{" "}
//             <SVGIcon
//               SVGComponent={DownArrow}
//               width={"15px"}
//               height={"15px"}
//             />{" "}
//           </DropDownHeader>
//           <div style={{ padding: "5px" }}>Approve</div>
//           <div style={{ padding: "5px" }}>Decline</div>
//           <div style={{ padding: "5px" }}>Remove</div>
//         </DropDownList>
//       </DropDownListContainer>
//     </>
//   )}
