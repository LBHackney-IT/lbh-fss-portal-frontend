import React, { useEffect } from "react";
import SVGIcon from "../../../components/SVGIcon/SVGIcon";
import { ReactComponent as ArrowLeft } from "./icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "./icons/arrow-right.svg";
import styled from "styled-components";
import { grey } from "../../../settings";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";

const StyledPaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 30px 0;
  ${breakpoint("sm")`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  `};
`;

const StyledButton = styled.button`
  border: 1px solid #dddddd;
  background-color: white;
  padding: 5px 8px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const StyledPreviousButton = styled(StyledButton)`
  border-radius: 3px 0px 0px 3px;
`;

const StyledPreviousText = styled.p`
  display: inline;
  margin-left: 7px;
`;

const StyledActiveButton = styled(StyledButton)`
  background-color: #025ea6;
  color: white;
`;

const StyledNextButton = styled(StyledButton)`
  border-radius: 0px 3px 3px 0px;
`;

const StyledNextText = styled.p`
  display: inline;
  margin-right: 7px;
  min-width: 105px;
`;

const StyledSummaryText = styled.p`
  color: ${grey[700]};
`;

function UserPagination({
  pageMinIndex,
  pageMaxIndex,
  totalEntries,
  pageIndex,
  pageCount,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) {
  useEffect(() => {
    if (document.querySelector("#arrow-left")) {
      if (!canPreviousPage) {
        document.querySelector("#arrow-left").style.fill = "#dadada";
      } else {
        document.querySelector("#arrow-left").style.fill = "#025DA3";
      }
    }
  }, [canPreviousPage]);

  useEffect(() => {
    if (document.querySelector("#arrow-right")) {
      if (!canNextPage) {
        document.querySelector("#arrow-right").style.fill = "#dadada";
      } else {
        document.querySelector("#arrow-right").style.fill = "#025DA3";
      }
    }
  }, [canNextPage]);

  return (
    <StyledPaginationContainer>
      <StyledSummaryText>
        Showing <strong>{pageMinIndex}</strong> to{" "}
        <strong>{pageMaxIndex}</strong> of <strong>{totalEntries}</strong>{" "}
        entries
      </StyledSummaryText>
      {totalEntries > 10 ? (
        <div>
          <StyledPreviousButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <SVGIcon SVGComponent={ArrowLeft} width={"15px"} height={"15px"} />
            <StyledPreviousText>Previous</StyledPreviousText>
          </StyledPreviousButton>
          {pageIndex - 2 >= 0 ? (
            <StyledButton onClick={() => gotoPage(pageIndex - 2)}>
              {pageIndex - 1}
            </StyledButton>
          ) : null}
          {pageIndex - 1 >= 0 ? (
            <StyledButton onClick={() => gotoPage(pageIndex - 1)}>
              {pageIndex}
            </StyledButton>
          ) : null}
          <StyledActiveButton onClick={() => gotoPage(pageIndex)}>
            {pageIndex + 1}
          </StyledActiveButton>
          {pageIndex + 1 <= pageCount - 1 ? (
            <StyledButton onClick={() => gotoPage(pageIndex + 1)}>
              {pageIndex + 2}
            </StyledButton>
          ) : null}
          {pageIndex + 2 <= pageCount - 1 ? (
            <StyledButton onClick={() => gotoPage(pageIndex + 2)}>
              {pageIndex + 3}
            </StyledButton>
          ) : null}
          {pageIndex + 3 <= 4 ? (
            <StyledButton onClick={() => gotoPage(pageIndex + 3)}>
              {pageIndex + 4}
            </StyledButton>
          ) : null}
          {pageIndex + 4 <= 4 ? (
            <StyledButton onClick={() => gotoPage(pageIndex + 4)}>
              {pageIndex + 5}
            </StyledButton>
          ) : null}
          <StyledNextButton onClick={() => nextPage()} disabled={!canNextPage}>
            <StyledNextText>Next</StyledNextText>
            <SVGIcon SVGComponent={ArrowRight} width={"13px"} height={"13px"} />
          </StyledNextButton>
        </div>
      ) : null}
    </StyledPaginationContainer>
  );
}

export default UserPagination;
