import { useState , useEffect} from "react";

function Namaste() {
return (
    <>
    <h1>Jagjot Singh</h1>
    </>
)
}

function Name(Component) {
return function newName() {
    return (
        <>
        <Component />
        <h2>MCA </h2>
        </>
    )
}
}

const NewVariable = Name(Namaste);

export default NewVariable ;