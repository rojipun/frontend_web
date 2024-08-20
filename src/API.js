import axios from 'axios';

// Function to get the Basic Auth credentials
const getAuthHeader = () => {
  const username = 'admin'; // or 'test'
  const password = 'admin'; // or 'test'
  const credentials = `${username}:${password}`;
  // Encode credentials to Base64
  const token = btoa(credentials);
  return `Basic ${token}`;
};

// Create an Axios instance with default headers
const apiClient = axios.create({
  baseURL: 'https://localhost:7213', // Adjust to your API base URL
  headers: {
    'Authorization': getAuthHeader(),
    'Accept': 'application/json'
  }
});


export default apiClient;
