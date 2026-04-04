import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";

export default function AddUser() {
  const { addUser, loading } = useUsers();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await addUser({
      ...data,
      mobileNumber: Number(data.mobileNumber),
    });
    if (result.success) {
      reset();
      navigate("/users");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-2xl text-3xl mb-4">
            👤
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Add New User</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to create a user</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-400 ${
                errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-400 ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="number"
              placeholder="9876543210"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-400 ${
                errors.mobileNumber ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
              }`}
              {...register("mobileNumber", {
                required: "Mobile number is required",
                minLength: { value: 10, message: "Must be at least 10 digits" },
              })}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-400 ${
                errors.dateOfBirth ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
              }`}
              {...register("dateOfBirth", { required: "Date of birth is required" })}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:shadow-indigo-400/40 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
          >
            {loading ? "Creating..." : "Create User ✨"}
          </button>
        </form>
      </div>
    </div>
  );
}
