import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../Components/animations/PageTransition";

export default function PublicLayout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col text-stone-900 bg-[#FFFCEB] antialiased selection:bg-comic-yellow selection:text-black">
      <Header />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
