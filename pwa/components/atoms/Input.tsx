type InputProps = {
  value?: string,
  onChange?: any,
  placeholder?: string,
  type?: string,
  classname?: string,
}

function Input({ value = '', onChange, placeholder = '', type = "text", classname = '' }: InputProps) {
  if (!onChange) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        className={classname}
      />
    );
  }

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
