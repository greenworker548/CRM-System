import { Button } from "../Button/Button"
import "./ErrorContent.scss"

export const ErrorContent = ({ error, onClose }) => {
  return (
    <div className="error__content">
      <h3>ERROR!</h3>
      <p>{error}</p>
      <Button type="button" onHandler={onClose} className="button secondary">Ok</Button>
    </div>
  )
}