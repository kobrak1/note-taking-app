const baseUrls = '/api/login';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (credentials) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // Handle non-2xx responses (e.g., 401 Unauthorized, 400 Bad Request)
      throw new Error(`Failed to login: ${response.statusText}`);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token)  // store the token in local storage
    console.log('logged in successfully');
    return data;
  } catch (error) {
    console.error('Login failed:', error.message);
    // Handle login failure
    throw error;
  }
};

export default { login };
