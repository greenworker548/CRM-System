import "./Button.scss"

interface ButtonProps {
  variant: string,
  type: "submit" | "reset" | "button",
  onHandler?: () => void,
  children: React.ReactNode,
}

export const Button = ({ variant, type, onHandler, children }: ButtonProps) => {
  return (
    <button className={`button ${variant}`} type={type} onClick={onHandler}>
      {children}
    </button>
  )
}
