import React from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

/**
 * InputField component
 *
 * @param {object} props component's customisable properties
 * @param {string} [props.label] Label for the input
 * @param {(string) => void} [props.onChange] The callback function to call
 * @param {boolean} [props.required] Represents if the input is mandatory or not
 * @param {string} [props.type] Input type
 * @param {string} [props.value] Value in the input
 * @param {string} [props.placeholder] The text to be displayed by default
 * @param {string} [props.name] The name of the input
 * @returns {React.ReactNode} Molecule that regroups the Input and Label tags
 */
function InputField({ label, onChange, required, type = "text", value = "", placeholder = "", name= "" }) {
  return (
    <Label classname="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-300">{label}</span>

      <Input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        classname="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
      />
    </Label>
  );
}

export default InputField;
