import { ChangeEventHandler } from "react"

export interface TextInputProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const TextInput: React.FC<TextInputProps> = ({ id, label, placeholder, value, onChange }) => {
  return <div>
    <label htmlFor={id} className="form-label inline-block mb-2 text-gray-700">
      {label}
    </label>
    <input id={id}
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      />
  </div>
}

export default TextInput