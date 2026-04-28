import React from "react";

/**
 * Input component
 *
 * @param {object} props component's customisable properties
 * @param {() => void} [props.onChange] The callback function to call
 * @param {string} [props.value] Value in the input
 * @param {string} [props.placeholder] The text to be displayed by default
 * @param {string} [props.type] Input type
 * @param {string} [props.classname] The classname to give for the style
 * @param {string} [props.name] The name of the input
 * @param {boolean} [props.required] Represents if the input is mandatory or not
 * @returns {React.ReactNode} An HTML Input tag
 */
function Input({ onChange, value = "", placeholder = "", type = "text", classname = "", name = "", required }) {
  if (!onChange) {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        className={classname}
        required={required}
      />
    );
  }

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classname}
      required={required}
    />
  );
}

export default Input;
