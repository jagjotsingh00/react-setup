// Custom hook for data fetching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Don't fetch if no URL
    if (!url) return;
    
    setLoading(true); 
    
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [url]); // Re-fetch when URL changes
  
  return { data, loading, error };
}

// Using the useFetch hook
function Example2_UseFetch() {
  const [userId, setUserId] = useState(1);
  
  // Look how clean this is! No fetch logic in component
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  
  return (
    <div style={styles.example}>
      <h3>Example 2: useFetch Hook</h3>
      
      <div style={styles.controls}>
        <label>Select User: </label>
        <select 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)}
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
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      )}
      
      <div style={styles.explanation}>
        :bulb: <strong>Benefits of useFetch:</strong><br/>
        :white_check_mark: Reusable across all components<br/>
        :white_check_mark: Handles loading, error, data states automatically<br/>
        :white_check_mark: Re-fetches when URL changes<br/>
        :white_check_mark: Component stays clean and simple<br/>
        :white_check_mark: Can add features once (caching, retry) - all components benefit
      </div>
      
      <div style={styles.codeBox}>
        <h4>The useFetch Hook:</h4>
        <pre style={styles.code}>{`function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Usage:
const { data, loading, error } = useFetch('/api/users/1');`}</pre>
      </div>
    </div>
  );
}

export default useFetch ;