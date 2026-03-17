import Greeting from "./Greeting"
import Parent from "./Parent"

const Header = () => {
    // let name = prompt("enter your name");
    return (
    <>
        <h1>This is header component</h1>
        <Greeting name = "Jagjot singh" age = {23} />  
        <Parent />
    </>
    )
}

export default Header 