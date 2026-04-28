import React from "react";

/**
 * Label component
 *
 * @param {object} props component's customisable properties
 * @param {React.ReactNode} [props.children] Children of the Label component
 * @param {string} [props.classname] The classname to give
 * @returns {React.ReactNode} An HTML Label tag
 */
function Label({ children, classname = "flex flex-col gap-1"}) {
  return (
    <label className={classname}>
      {children}
    </label>
  );
}

export default Label;
