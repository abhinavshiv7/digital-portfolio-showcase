/**
 * App.tsx - Root Application Component
 * 
 * This is the root component that sets up the application infrastructure:
 * - QueryClientProvider: React Query for server state management
 * - TooltipProvider: Global tooltip context from Radix UI
 * - Toaster components: Toast notifications (both shadcn and Sonner)
 * - BrowserRouter: Client-side routing
 * 
 * Routes:
 * - "/" : Main portfolio page (Index)
 * - "*" : 404 Not Found page
 * 
 * @component
 * @file src/App.tsx
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/** React Query client instance for caching and server state */
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
