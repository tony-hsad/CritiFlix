import React from "react";
import Div from "../atoms/Div";

/**
 * The footer component to display quick and final information
 *
 * @returns {React.ReactNode} Footer component
 */
function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-6">
      <Div classname="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
        Copyright 2026
      </Div>
    </footer>
  );
}

export default Footer;
