import React from "react";

/**
 * Link component
 *
 * @param {object} props component's customisable properties
 * @param {string} [props.to] The link to access
 * @param {string} [props.target] The behavior to give when redirecting
 * @param {string} [props.classname] The classname to give for the style
 * @param {string} [props.content] The text to display on the link
 * @returns {React.ReactNode} An HTML '<a>' tag in order to redirect user on other pages
 */
function Link({ to, target = '_blank', classname = '', content = '' }) {
  return <a className={classname} href={to} target={target}>{content}</a>;
}

export default Link;
