import "./Button.scss"

export const Button = ({className, type, onHandler, children}) => {
    return (
        <button className={className} type={type} onClick={onHandler}>
            {children}
        </button>
    )
}