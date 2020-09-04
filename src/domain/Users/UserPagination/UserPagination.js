import React from "react";
import Icon from "../../../components/Icon/Icon";
import arrowLeft from "./icons/arrow-left.svg";
import arrowRight from "./icons/arrow-right.svg";

function UserPagination({
  pageIndex,
  pageCount,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) {
  return (
    <div>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        <Icon imageLocation={arrowLeft} />
        Previous
      </button>
      {pageIndex - 2 >= 0 ? (
        <button onClick={() => gotoPage(pageIndex - 2)}>{pageIndex - 1}</button>
      ) : null}
      {pageIndex - 1 >= 0 ? (
        <button onClick={() => gotoPage(pageIndex - 1)}>{pageIndex}</button>
      ) : null}
      <button
        onClick={() => gotoPage(pageIndex)}
        style={{ backgroundColor: "blue" }}
      >
        {pageIndex + 1}
      </button>
      {pageIndex + 1 <= pageCount - 2 ? (
        <button onClick={() => gotoPage(pageIndex + 1)}>{pageIndex + 2}</button>
      ) : null}
      {pageIndex + 2 <= pageCount - 2 ? (
        <button onClick={() => gotoPage(pageIndex + 2)}>{pageIndex + 3}</button>
      ) : null}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        Next
        <Icon imageLocation={arrowRight} />
      </button>
    </div>
  );
}

export default UserPagination;
