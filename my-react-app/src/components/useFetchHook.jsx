import { useState } from "react";
import { useFetch } from "./CustomHooks";
const FetchHook = () => {
    const [userId,setUserId] = useState(1);

    const {data : user , loading , error} = useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);


    const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  controls: {
    marginBottom: "20px",
  },

  select: {
    padding: "8px 12px",
    fontSize: "14px",
    marginLeft: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },

  loading: {
    color: "#007bff",
    fontWeight: "bold",
    marginTop: "10px",
  },

  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },

  userCard: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  heading: {
    marginBottom: "10px",
    color: "#333",
  },

  text: {
    margin: "5px 0",
    color: "#555",
  }
};

    return(
        <>
        <h3>Example 2: useFetch Hook</h3>


        <div style={styles.controls}>
            
        <label>Select User: </label>

        <select 
          value={userId} 
          onChange={(e) => setUserId(Number(e.target.value))}
          style={styles.select}
        >

          {[1, 2, 3, 4, 5].map(id => (
            <option key={id} value={id}>User {id}</option>
          ))}

        </select>
      </div>

          
      {loading && <div style={styles.loading}>Loading user...</div>}
      
      {error && <div style={styles.error}>Error: {error}</div>}
      
      {user && (
        <div style={styles.userCard}>
          <h4>{user.name}</h4>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company?.name}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      )}
        
        </>
    )
}
export {FetchHook}