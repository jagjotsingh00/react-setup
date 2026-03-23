import { useState,useEffect } from "react";


const StudentList = () => {

    

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
  }
}


const [student ,setstudents] = useState([]);
const [loading,setLoading] = useState(true);
const [error ,setError] = useState(null);

useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response =>{
        console.log(':satellite_antenna: Response received');
        if(!response.ok){
            throw new Error ('failed to fecth data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data recived :', data); 
        setstudents(data);
        setLoading(false);
    })
    .catch(fault => {
        console.log('Error',fault);
        setError(fault);
        setLoading(false);
    });
},[]);


 if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h2>:hourglass_flowing_sand: Loading students...</h2>
          <p>Fetching data from API</p>
        </div>
      </div>
    );
  }


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
  


 return (
    <div style={styles.container}>
      <h1 style={styles.title}>student Directory</h1>
      <p style={styles.subtitle}>
        :white_check_mark: Successfully loaded {student.length} student
      </p>
      
      <div style={styles.grid}>
        {student.map(student => (
          <div key={student.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3>{student.name}</h3>
              <span style={styles.badge}>ID: {student.id}</span>
            </div>
            <div style={styles.cardBody}>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Phone:</strong> {student.phone}</p>
              <p><strong>Company:</strong> {student.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
  

  
}


export default StudentList