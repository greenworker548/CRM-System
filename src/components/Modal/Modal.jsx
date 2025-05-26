import "./Modal.scss"

export const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal__overlay">
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
