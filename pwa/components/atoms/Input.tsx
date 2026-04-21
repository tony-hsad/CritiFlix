type InputProps = {
  value?: string,
  onChange?: any,
  placeholder?: string,
  type?: string,
  classname?: string,
}

function Input({ value = '', onChange, placeholder = '', type = "text", classname = '' }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classname}
    />
  );
}

export default Input;
