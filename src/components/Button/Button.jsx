import "./Button.scss"

export const Button = ({ variant, type, onHandler, children }) => {
  return (
    <button className={`button ${variant}`} type={type} onClick={onHandler}>
      {children}
    </button>
  )
}
