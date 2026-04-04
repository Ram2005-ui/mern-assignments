import { useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import toast from 'react-hot-toast' 
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const login=useAuth((state)=>state.login);
  const isAuthenticated=useAuth((state)=>state.isAuthenticated);
  const currentUser=useAuth((state)=>state.currentUser);
  let navigate = useNavigate();


  const loading=useAuth((state)=>state.loading);
  const error=useAuth((state)=>state.error);

  

  const onUserLogin = async (userCredObj) => {
    await login(userCredObj)
    // setLoading(true);
    // try {
    //   let res = await fetch("http://localhost:4000/user-api/users/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(credentials),
    //   });

    //   if (res.status === 200) {
    //     navigate("/");
    //   } else {
    //     throw new Error("Invalid email or password.");
    //   }
    // } catch (err) {
    //   setError(err);
    // } finally {
    //   setLoading(false);
    // }
  };
  useEffect(()=>{
    if(isAuthenticated && currentUser){  // ✅ Add null check
      if(currentUser.role==="USER"){
        navigate("/user-profile");
      }
      else if(currentUser.role==="AUTHOR"){  // Use else if for better logic
        navigate("/author-profile");
      }
    }
  },[isAuthenticated,currentUser,navigate])  // Add navigate to dependencies

  if (loading) {
    return <p className="text-center text-orange-400 text-3xl mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 text-3xl mt-20">{error}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>

        <form onSubmit={handleSubmit(onUserLogin)}>

          {/* Email — must match a registered email in UserModel */}
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password - required in UserModel */}
          <div className="mt-4">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              placeholder="Password"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200 mt-6"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;