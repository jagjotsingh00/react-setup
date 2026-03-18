import { useState } from "react";

const ToggleButton = () => {

const isLoggedIn = 1;

// return (
//     <div>
//         {isLoggedIn ? <h1>Welcome User</h1> : <h1>Please Login</h1>}
//     </div>
// );



    const [show, setShow] = useState(true)

    return (
        <>
         {show && <h1>Hello World!!</h1>}
         <button onClick={() => setShow(!show)}> Toggle</button>
        </>

    )
}



export default ToggleButton;