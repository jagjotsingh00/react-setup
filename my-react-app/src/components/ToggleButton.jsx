import { useState } from "react";

const ToggleButton = () => {
    const [show, setShow] = useState(true)

    return (
        <>
         {show && <h1>Hello World!!</h1>}
         <button onClick={() => setShow(!show)}> Toggle</button>
        </>

    )
}
export default ToggleButton;