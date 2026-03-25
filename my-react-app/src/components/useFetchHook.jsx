import { useState } from "react";
import { useFetch } from "./CustomHooks";
const FetchHook = () => {
    const [userId,setUserId] = useState(1);

    const {data : user , loading , error} = useFetch();

    return(
        <>
        <h3>Example 2: useFetch Hook</h3>

        
        </>
    )
}