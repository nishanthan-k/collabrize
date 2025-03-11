import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useeffct')
    // Check if user is already authenticated (Spring Boot session is active)
    axios.get("http://localhost:9000/api/auth/", { withCredentials: true })
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user
        navigate("/dashboard"); // Redirect to dashboard
      })
      .catch(() => {
        // User is not authenticated, show login buttons
      });
  }, [navigate]);

  const handleOAuth = (provider: string) => {
    window.location.href = `http://localhost:9000/oauth2/authorization/${provider}`;
  };

  return (
    <main>
      <button onClick={() => handleOAuth("github")}>GitHub</button>
      <button onClick={() => handleOAuth("google")}>Google</button>
    </main>
  );
}

export default Login;
