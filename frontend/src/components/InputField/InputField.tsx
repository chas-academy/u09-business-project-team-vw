import "./InputField.scss";

type InputFieldProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelText?: React.ReactNode;
};

export function InputField({
  className = "",
  inputProps = {},
  labelText,
  children,
  ...labelProps
}: InputFieldProps) {
  return (
    <label className={`inputField-label ${className}`} {...labelProps}>
      {labelText}
      <br />
      {children}
      <input className="inputField-input" {...inputProps} />
    </label>
  );
}