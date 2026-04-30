import React from "react";

/**
 * An H1-level title component
 *
 * @param {object} props component's customisable properties
 * @param {string} [props.content] The text to display for the title
 * @param {string} [props.classname] The classname to give for the style
 * @returns {React.ReactNode} An HTML H1 tag
 */
function H1({ content, classname = '' }) {
  return (
    <h1 className={classname}>
      {content}
    </h1>
  );

}

export default H1;
