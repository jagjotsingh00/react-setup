import { useState } from "react"
import './TodoList.css'
const TodoList = () => {
    const [task, setTask] = useState([])
    const [input,setInput] = useState("")
    // const [remove,setRemove] = useState("")
    const Task = () => {
        if (input.trim() === ""){
            return;
        }
        setTask([...task,input])
    }
 
    const handleChange = (e) => {
        setInput(e.target.value)
        // console.log(e.target.value);
    }
    const remove = (index) => {
    const updateList = task.filter((a,i) => i !== index)
    setTask(updateList)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
          setInput("")

    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>To Do List</h1>
           <div>
             <input value={input} type="text" placeholder="Enter Tasks" onChange={handleChange} />
            <button onClick={Task} type="submit">Add Tasks</button>
           </div>
          {
            <ul>
            {task.map((x,i) => (
                <li key={i}>{x}
                 <span>
                <input type="checkbox"></input>
                <button><i class="fa-solid fa-pen-to-square"></i></button>
                <button onClick={() => remove(i)}><i class="fa-solid fa-trash"></i></button>
                </span>
                </li>
            ))}
           </ul>
        }
        </form>
    )
}
export default TodoList