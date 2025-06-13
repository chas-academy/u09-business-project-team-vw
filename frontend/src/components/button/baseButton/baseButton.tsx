import "./baseButton.scss"

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const BaseButton: React.FC<BaseButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button className={`base-button ${className}`} {...props}>
      {children}
    </button>
  );
};