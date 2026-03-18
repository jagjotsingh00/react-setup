import { useState } from "react";

const Input = () => {

    const [name, setName] = useState("")

    const handleChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`submitted by ${name}`)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your Name" onChange={handleChange} />
                <button type="submit">Submit</button>
                <h2>Hello, {name}</h2>

            </form>

        </>
    )
}
export default Input;





// import React, { useState }  from "react";


// function App() {

//   // const [count, setCount ] = useState(0)
//   const [name, setName] = useState("")

//   const handleChange = (e) => {
//         console.log(e.target.value)
//         setName(e.target.value)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();  // prevent page reload
//     alert("Submitted by " + name)
//   }

//   return (
//     <>
//       {/* <h1>Count: {count}</h1>
//       <button onClick={()=> setCount(count+1)}> Increment </button>
//       <button onClick={()=> setCount(count-1)}> Decrement </button> */}
//       <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Enter your name" onChange = {handleChange} />
//       <button type="submit">Submit</button>
//       </form>
//       {/* <h1>Hello {name}</h1>   */}

//     </>
//   )
// }


// export default App;