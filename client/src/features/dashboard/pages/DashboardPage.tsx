import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../../global/constants/apiUrls";

interface User {
  email: string,
  name: string,
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}${apiUrl.user.info}`, { withCredentials: true })
      .then(res => setUser(res.data));
  }, []);


  return (
    <div className="flex">
      <h1>Welcome to Dashboard</h1>
      {user ? (
        <>
          <p><strong>{user.email}</strong></p>
          <p><strong>{user.name}</strong></p>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default Dashboard;
