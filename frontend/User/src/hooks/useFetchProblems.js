import { useState, useEffect } from 'react';

const useFetchProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchProblems = async () => {
      try {
        
        const response = await fetch('http://localhost:5000/api/problems');
        
        
        if (!response.ok) {
          throw new Error('Failed to fetch problems');
        }

        
        const data = await response.json();
        setProblems(data); 
      } catch (error) {
        
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchProblems();
  }, []); 

  return { problems, loading, error };
};

export default useFetchProblems;
