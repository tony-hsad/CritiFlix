import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 * An Image component
 *
 * @param {object} props component's customisable properties
 * @param {string} [props.src] The image source link
 * @param {string} [props.alt] The alternate text for the image
 * @param {string} [props.classname] The classname to give for the style
 * @returns {React.ReactNode} An HTML Img tag
 */
function Image({ src, alt, classname = ''}) {
    return (
      <LazyLoadImage
        className={`w-full h-full object-cover ${classname}`}
        src={src}
        width={600}
        height={400}
        alt={alt}
      />
    );
}


export default Image;
