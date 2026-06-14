import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { EvaluationsProvider } from "@/contexts/EvaluationsContext";
import { SearchProvider } from "@/contexts/SearchContext";

import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Evaluate from "@/pages/Evaluate";
import Results from "@/pages/Results";
import Suggestions from "@/pages/Suggestions";
import History from "@/pages/History";
import IdeaBank from "@/pages/IdeaBank";
import Profile from "@/pages/Profile";
import Report from "@/pages/Report";
import Compare from "@/pages/Compare";
import Advisor from "@/pages/Advisor";
import PitchDeck from "@/pages/PitchDeck";
import Forecast from "@/pages/Forecast";
import MarketMap from "@/pages/MarketMap";

import AppShell from "@/components/layout/AppShell";
import { Redirect } from "wouter";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <AppShell>
      <Component {...rest} />
    </AppShell>
  );
}

function Router() {
  const { user } = useAuth();

  return (
    <Switch>
      {/* Public / Auth routes */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/report/:id" component={Report} />

      {/* Protected routes wrapped in AppShell */}
      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/evaluate" component={() => <ProtectedRoute component={Evaluate} />} />
      <Route path="/results/:id" component={(params) => <ProtectedRoute component={Results} {...params} />} />
      <Route path="/suggestions/:id" component={(params) => <ProtectedRoute component={Suggestions} {...params} />} />
      <Route path="/history" component={() => <ProtectedRoute component={History} />} />
      <Route path="/compare" component={() => <ProtectedRoute component={Compare} />} />
      <Route path="/advisor" component={() => <ProtectedRoute component={Advisor} />} />
      <Route path="/pitch-deck/:id" component={(params) => <ProtectedRoute component={PitchDeck} {...params} />} />
      <Route path="/forecast/:id" component={(params) => <ProtectedRoute component={Forecast} {...params} />} />
      <Route path="/market-map/:id" component={(params) => <ProtectedRoute component={MarketMap} {...params} />} />
      <Route path="/idea-bank" component={() => <ProtectedRoute component={IdeaBank} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />

      {/* Fallback */}
      <Route component={() => (user ? <AppShell><NotFound /></AppShell> : <NotFound />)} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <EvaluationsProvider>
            <SearchProvider>
              <TooltipProvider>
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                  <Router />
                </WouterRouter>
                <Toaster />
              </TooltipProvider>
            </SearchProvider>
          </EvaluationsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
