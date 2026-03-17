import './Greeting.css'
const Greeting = ({name,age}) => {
   
    return (
        <>
         <div>
            <h2 className="text">Hello, {name}! Good Morning</h2>
            <h2>MY age is {age}</h2>
         </div>
        </>
    )
}

export default Greeting