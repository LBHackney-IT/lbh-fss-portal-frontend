import React from "react";

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
        {"<- Previous"}
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
        {"Next ->"}
      </button>
    </div>
  );
}

export default UserPagination;
