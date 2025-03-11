import { SignIn, SignUp } from "@clerk/clerk-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Decide whether the user wants to sign in or sign up based on the 'mode' query param
  const isLogin = searchParams.get("mode") !== "signup"; // Default to SignIn if no mode is provided

  const toggleAuthMode = () => {
    // Toggle between SignIn and SignUp based on the current mode
    navigate(isLogin ? "/auth?mode=signup" : "/auth?mode=login", { replace: true });
  };

  return (
    <div>
      {isLogin ? (
        <SignIn afterSignInUrl="/" /> // Automatically redirects to "/" after successful sign-in
      ) : (
        <SignUp afterSignUpUrl="/" /> // Automatically redirects to "/" after successful sign-up
      )}
      
      <button onClick={toggleAuthMode} style={{ marginTop: "10px" }}>
        {isLogin ? "Create an account" : "Already have an account? Sign in"}
      </button>
    </div>
  );
};

export default AuthPage;
