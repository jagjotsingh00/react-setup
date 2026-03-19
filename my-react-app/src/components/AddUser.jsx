import { useState } from "react";
const AddUser = () => {
    const [Users, setUsers] = useState([]);
    // const [input, setInput] = useState("")
    const addUser = () => {
        setUsers([...Users, "New Users"])
    }
    return (
        <>
            <button onClick={addUser}>Add User</button>
            {
                Users.length === 0 ? (<h3>User Not Found</h3>
                ) : (
                <ul>
                    {Users.map((x, i) => (
                        <li key={i} >{x} </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default AddUser;