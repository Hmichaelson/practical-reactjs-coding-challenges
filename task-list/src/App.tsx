import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList as initialTaskList } from "./siteData/taskList"

export type Task = {
  id: string
  title: string
  priority: "high" | "medium" | "low"
  status: string
  progress: number
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTaskList as Task[])
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const showDeleteModal = false

  const generateUniqueId = (): string => {
    const maxId = tasks.reduce((max, task) => {
      const numId = parseInt(task.id, 10)
      return numId > max ? numId : max
    }, 0)
    return String(maxId + 1).padStart(2, "0")
  }

  const handleAddTask = (title: string, priority: "high" | "medium" | "low") => {
    const newTask: Task = {
      id: generateUniqueId(),
      title,
      priority,
      status: "To Do",
      progress: 0,
    }
    // Prepend new task to the top of the list
    setTasks([newTask, ...tasks])
    setShowAddEditModal(false)
  }

  const handleOpenAddModal = () => {
    setShowAddEditModal(true)
  }

  const handleCloseModal = () => {
    setShowAddEditModal(false)
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={handleOpenAddModal} />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          onClose={handleCloseModal}
          onSubmit={handleAddTask}
        />
      )}
      {showDeleteModal && <DeleteModal />}
    </div>
  )
}

export default App
