export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return { token: data.token, role: data.role }; // JWT token and role
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};