import classNames from "classnames"
import { useState } from "react"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"

type Priority = "high" | "medium" | "low"

type AddEditTaskFormProps = {
  onClose: () => void
  onSubmit: (title: string, priority: Priority) => void
}

const AddEditTaskForm = ({ onClose, onSubmit }: AddEditTaskFormProps) => {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")

  const isInputEmpty = title.trim() === ""

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handlePriorityClick = (selectedPriority: Priority) => {
    setPriority(selectedPriority)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!isInputEmpty) {
      onSubmit(title.trim(), priority)
    }
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task</span>
            <Close className="cp" onClick={onClose} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={handleTitleChange}
            name="title"
            value={title}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {(["high", "medium", "low"] as Priority[]).map((p) => (
                <li
                  key={p}
                  className={classNames(p, { [`${p}-selected`]: priority === p })}
                  onClick={() => handlePriorityClick(p)}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title="Add" type="submit" disabled={isInputEmpty} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
