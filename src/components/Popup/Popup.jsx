import { Button } from "../Button/Button"
import "./Popup.scss"

export const Popup = ({isOpen, onClose, children}) => {
    if (!isOpen) return null

    return (
        <div className="popup__overlay" onClick={onClose}>
            <div className="popup__content" onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}