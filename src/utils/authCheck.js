export function checkUser(form, setError) {
  const error = {};

  if (!form.name) {
    error.name = "Name is required";
  }
  if (!form.email) {
    error.email = "Email is required";
  }
  if (!form.password) {
    error.password = "Password is required";
  }
  if (!form.confirmPassword) {
    error.confirmPassword = "Confirm password is required";
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (form.email && !emailPattern.test(form.email)) {
    error.email = "Invalid email format";
  }
  if (form.password && !passwordRegex.test(form.password)) {
    error.password =
      "Password must contain uppercase, lowercase, number, special character and be 8+ chars";
  }
  if (form.password !== form.confirmPassword) {
    error.confirmPassword = "Passwords do not match";
  }
  if (Object.keys(error).length > 0) {
    setError(error);
    return false;
  }
  return true;
}