import React from "react";

export function Footer() {
  return (
    <footer className="pb-6">
      <hr className="my-6" />
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm font-semibold py-1">
            Copyright © <span id="get-current-year">2022 </span>
            <a
              href="https://www.creative-tim.com?ref=njs-profile"
              className="hover:text-blue-400"
            >
              Created by Aranibar.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
