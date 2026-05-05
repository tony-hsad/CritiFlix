import Input from "../atoms/Input";
import Label from "../atoms/Label";

type InputFieldProps = {
  label: string;
  onChange?: () => void;
  required: boolean;
  type?: string;
  value?: string;
  placeholder?: string;
  name?: string;
}

function InputField({ label, onChange, required, type = "text", value = "", placeholder = "", name = "" }: InputFieldProps) {
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
