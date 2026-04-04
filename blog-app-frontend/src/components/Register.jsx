import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'
import { useAuth } from '../store/authStore'

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  let navigate = useNavigate();
  const logout = useAuth((state) => state.logout);

  const onRegister = async (newUser) => {
    setLoading(true);
    // Create form data object
    const formData = new FormData();
    //get user object
    let { role, profileImageUrl, ...userObj } = newUser;
    
    //add all fields to FormData object
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    
    // add role to FormData
    formData.append("role", role);
    console.log(role)
    
    // add profileImageUrl to FormData object (if file was selected)
    // Note: Both UserAPI and AuthorAPI expect "profileImageUrl"
    if (profileImageUrl && profileImageUrl[0]) {
      formData.append("profileImageUrl", profileImageUrl[0]);
    }

    try {
      if(role=="USER"){
        // Log FormData for debugging
        console.log("Sending FormData to /user-api/users");
        for (let [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`${key}: File - ${value.name}`);
          } else {
            console.log(`${key}: ${value}`);
          }
        }
        
        // Don't set Content-Type header - let axios handle it with proper boundary
        let resObj=await axios.post("http://localhost:4000/user-api/users", formData);
        console.log("Response:", resObj);
        console.log("Response Status:", resObj.status);
        if (resObj.status === 201) {
          console.log("✅ USER Registration successful - about to clear auth state");
          // Clear any existing auth state so user must log in
          await logout();
          console.log("✅ Auth state cleared");
          toast.success("Registration successful. Please login.");
          console.log("✅ Toast shown - navigating to /login");
          navigate("/login");
          console.log("✅ Navigate called");
          return;
        } else {
          throw new Error("Registration failed. Please try again.");
        }
      }
      else if(role=="AUTHOR"){
        // Log FormData for debugging
        console.log("Sending FormData to /author-api/users");
        for (let [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`${key}: File - ${value.name}`);
          } else {
            console.log(`${key}: ${value}`);
          }
        }
        
        // Don't set Content-Type header - let axios handle it with proper boundary
        let resObj=await axios.post("http://localhost:4000/author-api/users", formData);
        console.log("Response:", resObj);
        console.log("Response Status:", resObj.status);
        if (resObj.status === 201) {
          console.log("✅ AUTHOR Registration successful - about to clear auth state");
          // Clear any existing auth state so user must log in
          await logout();
          console.log("✅ Auth state cleared");
          toast.success("Registration successful. Please login.");
          console.log("✅ Toast shown - navigating to /login");
          navigate("/login");
          console.log("✅ Navigate called");
          return;
        } else {
          throw new Error("Registration failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response data:", err.response?.data);
      console.error("Error response status:", err.response?.status);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || "Registration failed";
      setError({message: errorMessage});
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  //cleanup(remove preview image from browser memory)
  useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
        }, [preview]);

  if (loading) {
    return <p className="text-center text-orange-400 text-3xl mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 text-3xl mt-20">{error.message}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h1>
        
        <form onSubmit={handleSubmit(onRegister)}>

          {/* Role Selection */}
          <div className="mb-1">
            <div className="flex items-center gap-6">
              <span className="text-gray-600 font-medium">Select Role:</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="USER"
                  {...register("role", { required: "Please select a role" })}
                  className="accent-blue-400 w-4 h-4"
                  defaultChecked
                />
                <span>User</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="AUTHOR"
                  {...register("role", { required: "Please select a role" })}
                  className="accent-blue-400 w-4 h-4"
                />
                <span>Author</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* First & Last Name */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1">
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 50, message: "Max 50 characters" },
                })}
                placeholder="First name"
                className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex-1">
              {/* lastName is optional in UserModel */}
              <input
                type="text"
                {...register("lastName", {
                  maxLength: { value: 50, message: "Max 50 characters" },
                })}
                placeholder="Last name (optional)"
                className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
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

          {/* Password */}
          <div className="mt-4">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                maxLength: { value: 100, message: "Password too long" },
              })}
              placeholder="Password"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Image (optional - stored as URL in model) */}
          <div className="mt-4">
            <input
        type="file"
        accept="image/png, image/jpeg"
        {...register("profileImageUrl")}
        onChange={(e) => {

            //get image file
            const file = e.target.files[0];
            // validation for image format
            if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG or PNG allowed");
                return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB");
                return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
            }

        }} />

            {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200 mt-6"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;