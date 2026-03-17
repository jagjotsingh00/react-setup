import Child  from "./Child"
const Parent = () => { 
    // return <Child name = "Jagjot singh"/>
 return  (
    <>
        <h1>Props Example</h1>
    <div className="propsDiv"> 
    <Child name = "Inderpal " role = "MERN Developer"/>
     <Child name = "Jagjot singh" role = "MERN Developer"/>
     <Child name = "Harshdeep singh" role = "MERN Developer"/></div>
     
    </>
    
 )
}

export default Parent