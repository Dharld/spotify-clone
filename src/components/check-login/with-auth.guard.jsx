import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// HOC for authentication guard
const withAuthGuard = (WrappedComponent) => {
  const AuthGuard = (props) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); // Get user from Redux store

    useEffect(() => {
      // Check if user is not logged in
      if (!user) {
        // Redirect to login page if user is not logged in
        navigate("/login");
      }
    }, [user, history]); // Re-run effect when user or history changes

    // Render the wrapped component if user is logged in
    return user ? <WrappedComponent {...props} /> : null;
  };

  return AuthGuard;
};

export default withAuthGuard;
