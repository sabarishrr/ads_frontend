export const registerUser = async (email, password, role) => {
    try {
        // console.log(email,password,role);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Registration failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };  