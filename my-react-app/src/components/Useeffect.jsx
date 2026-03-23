import { useState, useEffect } from 'react';

function SimpleUserList() {  
  
  
  const [users, setUsers] = useState([]);      
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      
  
  
  // fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response => response.json())
  //   .then(data => setUsers(data));
  
  // Why does this cause infinite loop?
  // 1. Component renders
  // 2. fetch runs → setUsers called
  // 3. State changes → component re-renders
  // 4. fetch runs AGAIN → setUsers called
  // 5. State changes → component re-renders
  // 6. ... repeats forever! 

 
  
  useEffect(() => {
    
    console.log(' useEffect is running!');
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        console.log(':satellite_antenna: Response received');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
    
  }, []); 
  // This empty array [] is CRITICAL!
  // It means: "Run this effect only ONCE when component mounts"
  // Without it → infinite loop
  // With it → runs only once :white_check_mark:
  
  // If still loading, show loading message
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h2>:hourglass_flowing_sand: Loading users...</h2>
          <p>Fetching data from API</p>
        </div>
      </div>
    );
  }
  
  // If there's an error, show error message
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>:x: Error!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // If data loaded successfully, show the users
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Directory</h1>
      <p style={styles.subtitle}>
        :white_check_mark: Successfully loaded {users.length} users
      </p>
      
      <div style={styles.grid}>
        {users.map(user => (
          <div key={user.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3>{user.name}</h3>
              <span style={styles.badge}>ID: {user.id}</span>
            </div>
            <div style={styles.cardBody}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '10px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '30px',
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#3b82f6',
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fee2e2',
    borderRadius: '10px',
    color: '#991b1b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f3f4f6',
  },
  badge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  cardBody: {
    fontSize: '14px',
    color: '#4b5563',
  },
};



export default SimpleUserList;


/* 
   WHAT YOU LEARNED:
   
   1. Fetching without useEffect = infinite loop
   
   2. useEffect(() => {}, []) = run once on mount
   
   3. Always track 3 states:
      - loading (before data arrives)
      - error (if something goes wrong)
      - data (the actual content)
   
   4. Flow:
      Component renders
      → useEffect runs
      → Set loading=true
      → Fetch data
      → If success: set data, set loading=false
      → If error: set error, set loading=false
      → Component re-renders with new data
   
   5. The empty array [] is critical!
      - [] = run once on mount
      - No array = run on every render (infinite loop!)
      - [something] = run when 'something' changes
   
   ============================================ */