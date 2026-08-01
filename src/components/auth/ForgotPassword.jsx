import { useState } from "react";
import fish from "../../assets/header.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPassword } from "../../tanstack/hooks/mutations/auth/authMutations";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotPasswordMutation = useForgotPassword();
  const handleSubmit = (e) => {
    e.preventDefault();

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Reset link sent successfully");
          navigate("/login");
        },

        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex bg-(--color-background)">
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={fish}
          alt="aquarium"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r to-(--color-background)/90"></div>

        <div className="absolute bottom-10 left-10">
          <h2 className="text-3xl font-bold text-(--color-accent)">
            Aquora
          </h2>

          <p className="text-slate-300 mt-2 max-w-xs">
            Reset your password and get back to exploring aquatic life.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-(--color-accent)">
            Forgot Password
          </h1>

          <p className="text-slate-400 mb-6">
            Enter your registered email address. We'll send you a password
            reset link.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-(--color-surface) text-(--color-text) border border-white/10 focus:border-(--color-accent) outline-none"
            />

            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="w-full bg-(--color-primary) text-black py-3 rounded-lg font-semibold hover:border hover:border-(--color-accent) hover:bg-transparent hover:text-(--color-accent) transition duration-300 cursor-pointer disabled:opacity-60"
            >
              {forgotPasswordMutation.isPending
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </form>

          <p
            onClick={() => navigate("/login")}
            className="mt-6 text-center text-slate-400 cursor-pointer"
          >
            Remember your password?{" "}
            <span className="text-(--color-secondary) hover:text-(--color-accent) hover:underline">
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;