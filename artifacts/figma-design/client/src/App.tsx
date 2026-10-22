import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Component } from "@/pages/Component";
import Chapter from "@/pages/Chapter";
import Business from "@/pages/Business";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Manual from "@/pages/Manual";
import Apply from "@/pages/Apply";
import Request from "@/pages/Request";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={Component} />
      <Route path="/chapter" component={Chapter} />
      <Route path="/business" component={Business} />
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route path="/manual" component={Manual} />
      <Route path="/apply" component={Apply} />
      <Route path="/request" component={Request} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
