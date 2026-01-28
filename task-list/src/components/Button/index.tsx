import classnames from "classnames"
import { MouseEventHandler, ReactNode } from "react"
import "./style.scss"

type ButtonProps = {
  title: string
  icon?: ReactNode
  outline?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ title, icon, outline, disabled, type = "button", onClick }: ButtonProps) => {
  return (
    <button className={classnames(outline && "outline", "button")} onClick={onClick} disabled={disabled} type={type}>
      {icon && <span className="icon">{icon}</span>}
      {title}
    </button>
  )
}

export default Button
