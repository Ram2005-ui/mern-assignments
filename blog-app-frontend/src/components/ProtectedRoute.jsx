import { useAuth } from "../store/authStore";
import { Navigate } from "react-router";
import toast from "react-hot-toast";

function ProtectedRoute({ children, allowedRoles }) {
  //get user login status from store
  const { loading, currentUser, isAuthenticated, hasCheckedAuth } = useAuth();
  //loading state
  if (loading || !hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
      </div>
    )
  }
  //if user not loggedin
  if (!isAuthenticated || !currentUser) {
    //redirect to Login
    return <Navigate to="/login" replace />;
  }

  // console.log("current user role", currentUser.role);
  // console.log("aloowed role", allowedRoles);
  // console.log(allowedRoles.includes(currentUser?.role));
  //check roles
  if (allowedRoles && currentUser.role!==allowedRoles) {
    toast.error("You are not authorized to access this page");
    if (currentUser.role === 'USER') return <Navigate to="/user-profile" replace />
    if (currentUser.role === 'AUTHOR') return <Navigate to="/author-profile" replace />
    //redirect to Login
    return <Navigate to="/login" replace  />;
  }

  return children;
}

export default ProtectedRoute;