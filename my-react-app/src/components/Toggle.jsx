import { useState } from "react";

const Toggle = () => {
    const[show,setShow] = useState(true)
    
    let message;
    if(show) {
            message = <span>Hello World!!</span>
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


