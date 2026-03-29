import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { User } from "../App";

interface LoginPageProps {
  onLogin: (user: User) => void;
  user: User | null;
}

export function LoginPage({ onLogin, user }: LoginPageProps) {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate({ to: "/compare" });
  }, [user, navigate]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !signupData.phone ||
      !signupData.address
    ) {
      setError("Please fill in all fields.");
      return;
    }
    onLogin({
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone,
      address: signupData.address,
    });
    navigate({ to: "/compare" });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields.");
      return;
    }
    onLogin({
      name: loginData.email.split("@")[0],
      email: loginData.email,
      phone: "",
      address: "",
    });
    navigate({ to: "/compare" });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(270deg, oklch(0.55 0.22 295), oklch(0.62 0.25 345), oklch(0.7 0.22 50), oklch(0.62 0.25 345))",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
        }}
      />
      <div
        className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "oklch(0.9 0.15 78)" }}
      />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "oklch(0.85 0.18 155)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-display font-extrabold text-white mb-2 drop-shadow-lg"
          >
            PriceHunt
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg"
          >
            Compare. Save. Shop. 🛒
          </motion.p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" data-ocid="auth.tab">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" data-ocid="auth.tab">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="mt-1"
                    data-ocid="auth.input"
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="mt-1"
                    data-ocid="auth.input"
                  />
                </div>
                {error && (
                  <p
                    className="text-red-500 text-sm"
                    data-ocid="auth.error_state"
                  >
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full text-white font-semibold py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.7 0.22 50))",
                  }}
                  data-ocid="auth.submit_button"
                >
                  Login →
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Your full name"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    className="mt-1"
                    data-ocid="auth.input"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    className="mt-1"
                    data-ocid="auth.input"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className="mt-1"
                    data-ocid="auth.input"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={signupData.phone}
                    onChange={(e) =>
                      setSignupData({ ...signupData, phone: e.target.value })
                    }
                    className="mt-1"
                    data-ocid="auth.input"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-address">Delivery Address</Label>
                  <Textarea
                    id="signup-address"
                    placeholder="Street, City, State, PIN Code"
                    value={signupData.address}
                    onChange={(e) =>
                      setSignupData({ ...signupData, address: e.target.value })
                    }
                    className="mt-1 resize-none"
                    rows={2}
                    data-ocid="auth.textarea"
                  />
                </div>
                {error && (
                  <p
                    className="text-red-500 text-sm"
                    data-ocid="auth.error_state"
                  >
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full text-white font-semibold py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.7 0.22 50))",
                  }}
                  data-ocid="auth.submit_button"
                >
                  Create Account →
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-white/60 text-xs mt-6">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
