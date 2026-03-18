import { useState } from "react";

const Toggle = () => {
    const[show,setShow] = useState(true)
    
    let message;
    if(show) {
            message = <h1>Hello World!!</h1>
    }
   
    return (
        <>
         {message}
         <br />
        <button onClick={() => setShow(true)}>Show</button>
        <button onClick={() => setShow(false)}>Hide</button>
        </>
    )
}
export default Toggle


