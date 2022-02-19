import React from "react";

export function FormContainer({ children }) {
  return (
    <div className="container w-[360px] m-auto">
      <div className="justify-content-md-center">
        <div>{children}</div>
      </div>
    </div>
  );
}
