import "./Popup.scss"

export const Popup = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className="popup__overlay">
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
