import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, Target, TrendingUp, Shield } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("admin@startup.ai");
  const [password, setPassword] = useState("admin123");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Animated Aurora Brand */}
      <div className="hidden lg:flex w-1/2 bg-aurora flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl blob-float" />
        <div className="pointer-events-none absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-fuchsia-300/25 blur-3xl blob-float" style={{ animationDelay: "3s" }} />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <div className="flex items-center gap-2 mb-10">
            <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center ring-1 ring-white/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight">ASE System</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold leading-[1.1] mb-5 max-w-md">
            Evaluate your next big idea with <span className="bg-gradient-to-r from-fuchsia-200 via-violet-200 to-sky-200 bg-clip-text text-transparent">AI precision.</span>
          </h1>
          <p className="text-white/80 max-w-md text-lg leading-relaxed">
            Instant scoring, risk heat-meters, financial forecasts and pitch decks — all in one founder cockpit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative grid grid-cols-2 gap-3 max-w-md"
        >
          {[
            { icon: Sparkles, label: "AI Scoring" },
            { icon: TrendingUp, label: "5-Year Forecast" },
            { icon: Target, label: "Market Map" },
            { icon: Shield, label: "Risk Analysis" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 px-4 py-3">
              <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center">
                <f.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full bg-violet-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-fuchsia-100/60 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-7 relative"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to access your evaluations</p>
          </div>

          <Card className="border-border shadow-xl shadow-violet-500/10 backdrop-blur-sm bg-card/80">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-100 p-3 rounded-md text-xs text-violet-800 text-center">
                  Demo credentials: <span className="font-semibold">admin@startup.ai / admin123</span>
                </div>

                <Button type="submit" className="w-full h-11 text-base font-semibold shadow-md shadow-violet-500/25">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
