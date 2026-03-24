import { useState, useEffect } from "react";


const LifeCyclePractice = ({ productId }) => {

    const [data, setData] = useState(null)
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        console.log("Component Mounted");


        fetch(`https://dummyjson.com/products/${productId}`)
            .then(data => data.json())
            .then(data => {
                setData(data)
            });

        const timer = setInterval(() => {
            // console.log("Timer running");
            setCount(count => count + 1)
        }, 1000);

        return () => {
            clearInterval(timer);
            console.log("Component UnMounted");
        }

    }, []);

    return (
        <>
            <h2>Product : {data?.id} </h2>
            <h2>product : {data?.title}</h2>
            <h1>timer  : {count}</h1>
        </>
    );
};


export default LifeCyclePractice;