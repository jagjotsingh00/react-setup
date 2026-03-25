import { useState } from "react"
import { useCount } from "./CustomHooks";
// function Count() {
    
//     const [Count, setCount] = useState(0);

//   return (
//     <><h1>Count: {Count}</h1>
//       <button onClick={() =>  setCount(Count+1)}>Increment</button>
//       <button onClick={() => setCount(Count-1)}>Decrement</button>
//     </>
//   )
// }

export default Count ;

function Count() {
const {count,increment,decrement,reset} = useCount(0)

return(
  <>
  <h1>{count}</h1>
  <button onClick={increment}>INCRENMNT </button>
  <button onClick={decrement}>DECREMENT</button>
  <button onClick={reset}>Reset</button>
  </>
)
}