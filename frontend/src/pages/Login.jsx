import { useState,useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // ✅
import { Mail, Lock, Eye } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
      useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Already logged in, redirect to dashboard or home
      navigate("/dashboard");
    }
  }, [navigate]);

  const { toast } = useToast();
  const { login } = useAuth(); // ✅ use AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, email: userEmail } = res.data;

      if (token) {
        login(token); // ✅ context login
        localStorage.setItem("email", userEmail); // optional

        toast({
          title: "Success",
          description: "Logged in successfully",
        });

        navigate("/"); // ✅ redirect
      } else {
        toast({
          title: "Login Failed",
          description: "No token received from server",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-orange-100">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <img
          src="https://assets-global.website-files.com/5e9aa66fd3886c1ecf5c5f5d/63f5e2b6e2c2e2b6e2c2e2b6_cute-character-illustration.png"
          alt="Login Illustration"
          className="w-full max-w-md rounded-3xl shadow-xl border-4 border-white"
        />
      </div>
      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-primary/10">
          <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="h-5 w-5" />
                </span>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 py-2 border-2 border-yellow-200 focus:border-primary rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </span>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 py-2 border-2 border-yellow-200 focus:border-primary rounded-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer">
                  <Eye className="h-5 w-5" />
                </span>
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-xs text-yellow-600 hover:underline font-medium">Forgot Password?</a>
              </div>
            </div>
            <Button type="submit" className="w-full bg-rose-300 hover:bg-rose-400 text-lg font-semibold py-2 rounded-xl shadow-md">Log In</Button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm">Or Continue With</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <button type="button" className="bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="h-6 w-6" />
            </button>
            <button type="button" className="bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="h-6 w-6" />
            </button>
            <button type="button" className="bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-6 w-6" />
            </button>
          </div>
          <div className="text-center text-sm mt-2">
            Don’t have an account? <a href="/register" className="underline text-primary font-medium">Sign Up here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
