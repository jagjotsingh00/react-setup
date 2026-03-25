import { use, useEffect, useState } from "react"
function useCount(initialValue = 0) {
    const [count,setCount] = useState(initialValue)

    const increment = (c) => setCount((c) => c + 1 );
    const decrement = (c) => setCount((c) => c - 1 );
    const reset = () => setCount(initialValue);

    return{count,increment,decrement,reset};
}

export {useCount}

function useFetch() {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        if(!url)  return;

        setLoading(true);

        fetch(url)
        .then(response => {
            if(!response.ok) throw new Error('Failed to Fetch data')
            return response.json();
        })
        .then(() => {
            setData(data);
            setError(null);
        })
        .catch(() => {
            setError(err.message);
            setData(null);
        })
        .finally(() =>{
            setLoading(false);
        });
    },[url]);
    return{ data, loading, error };
}
export {useFetch}