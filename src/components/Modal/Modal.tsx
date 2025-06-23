import "./Modal.scss"

interface ModalProps {
  isOpen: boolean,
  children: React.ReactNode
}

export const Modal = ({ isOpen, children }: ModalProps) => {
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
