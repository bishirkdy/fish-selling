import { useState } from "react";
import fish from "../../assets/header.jpg";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../utils/authCheck";
import { toast } from "react-toastify";
import { login } from "../../redux/features/authSlice";
import { useRegisterUser } from "../../tanstack/hooks/mutations/auth/authMutations";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkUser(form, setError);
    if (!isValid) return;

    mutate(form, {
      onSuccess: (user) => {
        toast.success("User added successfully");
        navigate("/login");
      },
      onError: (err) => {
        console.log(err);

        toast.error(`${err?.message || "Something went wrong"} `);
      },
    });
  };

  return (
    <div className="min-h-screen flex bg-(--color-background) ">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-(--color-accent)">
            Create Account
          </h1>
          <p className="text-(--color-primary) mb-6">
            Join Aquora and explore aquatic beauty
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-(--color-surface) text-(--color-text) border ${
                  error.name ? "border-red-500" : "border-white/30"
                } focus:border-(--color-accent) outline-none`}
              />
              {error.name && (
                <p className="text-red-500 text-sm mt-1">{error.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={`w-full px-4 py-3 rounded-lg bg-(--color-surface) text-(--color-text) border ${
                  error.email ? "border-red-500" : "border-white/30"
                } focus:border-(--color-accent) outline-none`}
              />
              {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-(--color-surface) text-(--color-text) border border-white/30 focus:border-(--color-accent) outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-(--color-accent)"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-(--color-surface) text-(--color-text) border border-white/30 focus:border-(--color-accent) outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-(--color-accent)"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>
            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-(--color-secondary) cursor-pointer text-black hover:border hover:bg-transparent hover:text-(--color-accent) hover:border-(--color-accent) py-3 rounded-lg font-semibold transition duration-300"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
          <p
            onClick={() => navigate("/login")}
            className="text-slate-400 mt-6 text-center"
          >
            Already have an account?{" "}
            <span className="text-(--color-primary) hover:text-(--color-accent) cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 relative">
        <img src={fish} alt="fish" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-[#020617]/70 to-[#020617]/90"></div>
        <div className="absolute bottom-10 left-10">
          <h2 className="text-3xl text-(--color-accent) font-bold">Aquora</h2>
          <p className="text-slate-300 mt-2 max-w-xs">
            Dive into a world of colorful aquatic life
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
