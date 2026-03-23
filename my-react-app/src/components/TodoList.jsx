import { useState } from "react"
import Subtask from "./SubTasks"
import { useNavigate } from "react-router-dom"
import './TodoList.css'

const TodoList = () => {
    const Navigate = useNavigate()
    const [task, setTask] = useState([])
    const [input, setInput] = useState("")
    const [editIndex, setEditIndex] = useState(null)

    const Task = () => {
        if (input.trim() === "") {
            return
        }

        if (editIndex === null) {
           setTask([...task, { text: input, completed: false }])
        } else {
            const updatedList = task.map((item, index) =>
          index === editIndex ? { ...item, text: input } : item
            )
            setTask(updatedList)
            setEditIndex(null)
        }

        setInput("")
    }
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const remove = (index) => {
        const updateList = task.filter((a, i) => i !== index)
        setTask(updateList)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Task()
    }
    
    const markText = (j) => {
          const updatedList = task.map((item, index) =>
            index === j ? { ...item, completed: !item.completed } : item
        )
        setTask(updatedList)
    }
    const goToNextPage = () => {
            Navigate("/SubTasks")
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>To Do List 📋</h1>

            <div>
                <input
                    value={input}
                    type="text"
                    placeholder="Enter Tasks"
                    onChange={handleChange}
                />
                <button type="submit">
                    {editIndex === null ? "Add Tasks" : "Update Task"}
                </button>
            </div>
            <ul>
                {task.map((x, i) => (
                    <li key={i}>
                       <span className={x.completed ? "done" : ""}>{x.text}</span>
                        <span>
                            <input type="checkbox" checked = {x.completed} onChange={ () => markText(i)}/>
                            <button type="button" onClick={goToNextPage}>
                                <i className="fa-solid fa-list-check"></i>
                            </button>
                            <button type="button" onClick={() => edit(i)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="button" onClick={() => remove(i)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </span>
                    </li>
                ))} 
            </ul>
        </form>
        </>
    )
}

export default TodoList