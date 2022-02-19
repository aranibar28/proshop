import React from "react";

export const Message = ({ variant, children }) => {
  return <div variant={variant}>{children}</div>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
