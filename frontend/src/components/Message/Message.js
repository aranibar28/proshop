import React from "react";

export const Message = ({ variant, children }) => {
  return (
    <div className={`alert shadow-md alert-${variant} rounded mt-2`}>
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};
