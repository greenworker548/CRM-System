import "./Input.scss"

export const Input = ({ value, onChange}) => {
  return (
    <label>
      <input 
        type="text" 
        className="input"
        value={value}
        placeholder="Write something..."
        onChange={onChange} 
      />
    </label>
  )
}