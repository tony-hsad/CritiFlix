import React from "react";

/**
 * An Image component
 *
 * @param {object} props component's customisable properties
 * @param {string} [props.src] The image source link
 * @param {string} [props.alt] The alternate text for the image
 * @param {string} [props.classname] The classname to give for the style
 * @param {string} [props.loading] The value to give when loading (ex: lazy)
 * @returns {React.ReactNode} An HTML Img tag
 */
function Image({ src, alt, classname = '', loading = '' }) {
  return <img className={classname} src={src} alt={alt} loading={loading} />;
}


export default Image;
