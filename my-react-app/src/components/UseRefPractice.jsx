import { useRef } from "react";

const UsePracticeRef = () => {
    const inputRef = useRef(null)
    const inputHandle = () => {
        console.log('Jagjot Singh');
        inputRef.current.focus()
        inputRef.current.style.color = "red"
    }
    return (
        <>
            <input ref={inputRef} type="text" placeholder="Enter Username" />
            <button onClick={inputHandle}>Focus On Input Fuild</button>
        </>
    )
}

export default UsePracticeRef;