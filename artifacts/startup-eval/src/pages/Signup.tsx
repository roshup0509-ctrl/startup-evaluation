import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email, password);
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 text-primary-foreground">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-2xl tracking-tight">ASE System</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 max-w-md">
            Join the future of venture building.
          </h1>
          <p className="text-primary-foreground/80 max-w-md text-lg">
            Create an account to start scoring your startup ideas instantly.
          </p>
        </div>

        {/* Abstract Illustration */}
        <div className="w-full max-w-md aspect-square relative opacity-80">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="100" y="100" width="200" height="200" rx="24" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" opacity="0.3"/>
            <polygon points="200,80 320,280 80,280" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
            <circle cx="200" cy="200" r="40" fill="currentColor" opacity="0.8"/>
            <path d="M50 200 H 350 M 200 50 V 350" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
          </svg>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Create account</h2>
            <p className="text-muted-foreground mt-2">Sign up to get started</p>
          </div>

          <Card className="border-0 shadow-none lg:shadow-sm lg:border-border">
            <CardContent className="p-0 lg:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </div>
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
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create a password"
                  />
                </div>

                <Button type="submit" className="w-full mt-2">Sign Up</Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
