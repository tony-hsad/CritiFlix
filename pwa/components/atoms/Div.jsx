import React from "react";

/**
 * Div component
 *
 * @param {object} props component's customisable properties
 * @param {React.ReactNode} [props.children] Childrens of the Div component
 * @param {string} [props.classname] The classname to give for the style
 * @returns {React.ReactNode} An HTML Div tag
 */
function Div({ children, classname = '' }) {
  return (
    <div className={classname}>
      {children}
    </div>
  );
}

export default Div;
