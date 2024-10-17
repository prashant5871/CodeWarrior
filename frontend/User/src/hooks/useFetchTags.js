import { useState, useEffect } from 'react';
import axios from 'axios'; // Axios to make HTTP requests

const useFetchTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/tags'); // Adjust the URL to match your API endpoint
        setTags(response.data); // Assuming your backend returns the tags in `data`
      } catch (err) {
        setError(err.message || 'Error fetching tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();


  return { tags, loading, error };
};

export default useFetchTags;
