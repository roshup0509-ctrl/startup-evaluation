import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { UserCog } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export default function Profile() {
  const { user } = useAuth();
  const { evaluations } = useEvaluations();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");

  const initials = user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || "U";

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we would update the auth context
    toast.success("Profile updated successfully");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <PageHero
        accent="indigo"
        icon={UserCog}
        eyebrow="Account"
        title="Profile Settings"
        subtitle="Manage your account settings and preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-6 w-full flex justify-between text-sm py-3 border-t border-border">
                <span className="text-muted-foreground">Ideas Evaluated</span>
                <span className="font-medium">{evaluations.length}</span>
              </div>
              <div className="w-full flex justify-between text-sm py-3 border-t border-border">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{format(new Date(), "MMMM yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role / Title</Label>
                    <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Appearance</h3>
                <RadioGroup 
                  value={theme} 
                  onValueChange={setTheme}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="font-normal">Light Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="font-normal">Dark Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="font-normal">System Default</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-medium">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Evaluation Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts when long-running evaluations complete.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of your startup ideas.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
