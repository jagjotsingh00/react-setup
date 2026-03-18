import { useState } from "react";
const AddUser = () => {
    const [Users, setUsers] = useState([]);

    const User = () => {
        setUsers([...Users, "New Users"])
    }
    return (
        <>
            <button onClick={User}>Add User</button>
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