import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BookingProvider } from "@/context/BookingContext";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import Checkout from "./pages/Checkout";
import PropertyDetail from "./pages/PropertyDetail";
import WhyChooseUs from "./pages/WhyChooseUs";
import ForHomeowners from "./pages/ForHomeowners";
import GuestExperience from "./pages/GuestExperience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/property/:slug" element={<PropertyDetail />} />
              <Route path="/philosophy" element={<WhyChooseUs />} />
              <Route path="/management" element={<ForHomeowners />} />
              <Route path="/experiences" element={<GuestExperience />} />
              {/* Redirects for old URLs */}
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/for-homeowners" element={<ForHomeowners />} />
              <Route path="/guest-experience" element={<GuestExperience />} />
              <Route path="/services" element={<GuestExperience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<Collection />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
