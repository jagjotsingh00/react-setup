import { useState } from "react"
function Count() {
    
    const [Count, setCount] = useState(0);

  return (
    <><h1>Count: {Count}</h1>
      <button onClick={() =>  setCount(Count+1)}>Increment</button>
      <button onClick={() => setCount(Count-1)}>Decrement</button>
    </>
  )
}

export default Count ;