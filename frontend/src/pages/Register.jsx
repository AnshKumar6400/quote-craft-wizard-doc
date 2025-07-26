import { useState ,useEffect} from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Register = () => {
  const navigate=useNavigate();

      useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Already logged in, redirect to dashboard or home
      navigate("/dashboard");
    }
  }, [navigate]);

  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
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
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      toast({
        title: "Registered Successfully",
        description: "You can now log in.",
      });

      navigate("/login");
    } catch (err) {
      toast({
        title: "Registration Failed",
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
          alt="Register Illustration"
          className="w-full max-w-md rounded-3xl shadow-xl border-4 border-white"
        />
      </div>
      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-primary/10">
          <h2 className="text-3xl font-bold mb-2 text-center">Create an Account</h2>
          <form onSubmit={handleRegister} className="space-y-6 mt-6">
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
                  placeholder="Password (min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pl-10 py-2 border-2 border-yellow-200 focus:border-primary rounded-lg"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-rose-300 hover:bg-rose-400 text-lg font-semibold py-2 rounded-xl shadow-md">Register</Button>
          </form>
          <div className="text-center text-sm mt-6">
            Already have an account? <a href="/login" className="underline text-primary font-medium">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
