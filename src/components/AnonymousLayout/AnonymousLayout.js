import React from "react";

const AnonymousLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div>Find support services</div>
        {children}
      </div>
    </div>
  );
};

export default AnonymousLayout;
