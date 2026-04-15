import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BookingProvider } from "@/context/BookingContext";
import { lazy, Suspense } from "react";

// Eagerly load homepage (LCP-critical)
import Index from "./pages/Index";

// Lazy load all other routes
const Collection = lazy(() => import("./pages/Collection"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const WhyChooseUs = lazy(() => import("./pages/WhyChooseUs"));
const ForHomeowners = lazy(() => import("./pages/ForHomeowners"));
const GuestExperience = lazy(() => import("./pages/GuestExperience"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const PetFriendly = lazy(() => import("./pages/PetFriendly"));
const GroupStays = lazy(() => import("./pages/GroupStays"));
const AvilaBeach = lazy(() => import("./pages/locations/AvilaBeach"));
const PismoBeach = lazy(() => import("./pages/locations/PismoBeach"));
const SanLuisObispo = lazy(() => import("./pages/locations/SanLuisObispo"));
const CentralCoast = lazy(() => import("./pages/locations/CentralCoast"));
const ArroyoGrande = lazy(() => import("./pages/locations/ArroyoGrande"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/checkout/:slug" element={<Checkout />} />
                <Route path="/property/:slug" element={<PropertyDetail />} />
                <Route path="/philosophy" element={<WhyChooseUs />} />
                <Route path="/management" element={<ForHomeowners />} />
                <Route path="/experiences" element={<GuestExperience />} />
                {/* Redirects for old URLs */}
                <Route path="/why-choose-us" element={<WhyChooseUs />} />
                <Route path="/for-homeowners" element={<ForHomeowners />} />
                <Route path="/guest-experience" element={<GuestExperience />} />
                <Route path="/services" element={<GuestExperience />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/pet-friendly" element={<PetFriendly />} />
                <Route path="/group-stays" element={<GroupStays />} />
                <Route path="/avila-beach" element={<AvilaBeach />} />
                <Route path="/pismo-beach" element={<PismoBeach />} />
                <Route path="/san-luis-obispo" element={<SanLuisObispo />} />
                <Route path="/central-coast" element={<CentralCoast />} />
                <Route path="/arroyo-grande" element={<ArroyoGrande />} />
                <Route path="/book" element={<Collection />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
