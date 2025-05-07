export const Button = ({classVariant, type, onHandler, children}) => {
    return (
        <button className={classVariant} type={type} onClick={onHandler}>
            {children}
        </button>
    )
}