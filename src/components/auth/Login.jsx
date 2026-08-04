import { useState } from "react";
import fish from "../../assets/header.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice";
import { useLogin } from "../../tanstack/hooks/mutations/auth/authMutations";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: loginMutation, isPending } = useLogin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(form, {
      onSuccess: (user) => {
        if (user.isBlocked) {
          toast.error("Your account has been blocked.");
          return;
        }

        dispatch(login(user));

        if (user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

        toast.success("Login successful");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="min-h-screen flex bg-(--color-background)">
      <div className="hidden md:block md:w-1/2 relative">
        <img src={fish} alt="aquarium" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r  to-(--color-background)/90"></div>
        <div className="absolute bottom-10 left-10">
          <h2 className="text-3xl font-bold text-(--color-accent)">Aquora</h2>
          <p className="text-slate-300 mt-2 max-w-xs">
            Dive into a world of colorful aquatic life
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-(--color-accent)">
            Welcome Back
          </h1>
          <p className="text-slate-400 mb-6">Login to continue your journey</p>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-(--color-surface) text-(--color-text) border border-white/10 focus:border-(--color-accent) outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-(--color-surface) text-(--color-text) border border-white/10 focus:border-(--color-accent) outline-none"
              required
            />

            <div className="text-right text-sm">
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-(--color-secondary) hover:text-(--color-accent) cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-(--color-primary) text-black py-3 rounded-lg font-semibold hover:border hover:border-(--color-accent) hover:bg-transparent hover:text-(--color-accent) cursor-pointer transition duration-300"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <p
            onClick={() => navigate("/register")}
            className="text-slate-400 mt-6 text-center"
          >
            Don’t have an account?{" "}
            <span className="text-(--color-secondary) hover:text-(--color-accent) cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
