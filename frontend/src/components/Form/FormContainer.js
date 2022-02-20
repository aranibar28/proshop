import React from "react";

export function FormContainer({ children }) {
  return (
    <div className="container m-auto">
      <div>{children}</div>
    </div>
  );
}
