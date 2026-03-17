const Child = (props) => {
    // return <p>Hello, {props.name}</p>
    return (
        <>
        <div className="propsTask">
        <h2>Name : {props.name}</h2>
        <h3>Role : {props.role}</h3>
        </div>
        </>
    )
}

export default Child