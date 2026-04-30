import React from "react";

/**
 * Logo component
 *
 * @param {object} props component's customisable properties
 * @param {string} [props.content] The text to display for the Logo
 * @param {string} [props.classname] The classname to give for the style
 * @returns {React.ReactNode} The name of the app
 */
function Logo({ content, classname = '' }) {
  return (
    <span className={classname}>
      {content}
    </span>
  );
}

export default Logo;
