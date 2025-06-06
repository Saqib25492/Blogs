// utils/auth.js
import axios from 'axios';

export const checkUserAuthentication = async () => {
  try {
    const response = await axios.get('http://localhost:5000/verifyUser', {
      withCredentials: true,
    });
    
    if (response.data.success) {
      return { user: response.data.user.id }; 
    } else {
      return { user: null };
    }
  } catch (error) {
    console.error('Error checking user authentication:', error);
    return { user: null };
  }
};
