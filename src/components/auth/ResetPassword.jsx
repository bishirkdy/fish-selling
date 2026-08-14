import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import fish from "../../assets/header.jpg";
import { useResetPassword } from "../../tanstack/hooks/mutations/auth/authMutations";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { mutate: resetPasswordMutation, isPending } = useResetPassword();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    resetPasswordMutation(
      {
        token,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Password reset successfully.");
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
        <img src={fish} alt="Aquarium" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-linear-to-r to-(--color-background)/90"></div>

        <div className="absolute bottom-10 left-10">
          <h2 className="text-3xl font-bold text-(--color-accent)">Aquora</h2>

          <p className="text-slate-300 mt-2 max-w-xs">
            Create a new secure password for your account.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-(--color-accent)">
            Reset Password
          </h1>

          <p className="text-slate-400 mb-6">Enter your new password below.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 rounded-lg bg-(--color-surface) text-(--color-text) border border-white/10 focus:border-(--color-accent) outline-none"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-(--color-accent)"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 rounded-lg bg-(--color-surface) text-(--color-text) border border-white/10 focus:border-(--color-accent) outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-(--color-accent)"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-(--color-primary) text-black py-3 rounded-lg font-semibold hover:border hover:border-(--color-accent) hover:bg-transparent hover:text-(--color-accent) transition duration-300 cursor-pointer disabled:opacity-60"
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p
            onClick={() => navigate("/login")}
            className="text-center text-slate-400 mt-6 cursor-pointer"
          >
            Back to{" "}
            <span className="text-(--color-secondary) hover:text-(--color-accent) hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
