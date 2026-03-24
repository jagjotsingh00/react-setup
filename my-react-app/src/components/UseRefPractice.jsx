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

    // ====================================================================================================
    // TASK 2 

    function UnControlledInput() {
        const nameRef = useRef(null);
        const mailRef = useRef(null);



        return (
            <div>
                <h3>Example 2: Uncontrolled Form (useRef)</h3>
                <form onSubmit={handleSubmit}>
                    <input type ="username"
                    placeholder="Username"
                    style={style.input} />

                    <input type="email"
                    placeholder="Email"
                    style={style.input} />
                    <button type="submit" style={Style.submit}>Submit</button>
                </form>
            </div>
        )
    }

    
}



export default UsePracticeRef;