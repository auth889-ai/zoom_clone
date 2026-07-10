// Override with REACT_APP_SERVER_URL (e.g. http://localhost:8000 for a local backend).
const server = process.env.REACT_APP_SERVER_URL ||
    "https://apnacollegebackend.onrender.com";

export default server;
