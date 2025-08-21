import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser } from "@/store/slices/authSlice";
import type { RootState, AppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { clearError } from "@/store/slices/authSlice";


export function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!confirm) newErrors.confirm = "Please confirm password";
    else if (password !== confirm) newErrors.confirm = "Passwords don't match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Object.values(errors).forEach(error => toast.error(error));
      return;
    }

    const result = await dispatch(signupUser({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Account created successfully!");
      navigate("/login");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password (8+ characters)"
          required
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <Input
          type="password"
          label="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm your password"
          required
        />
        {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
      </div>
      
      <Button text="Create Account" loading={loading} />
    </form>
  );
}