import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col text-stone-900 bg-[#FFFCEB] antialiased selection:bg-comic-yellow selection:text-black">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
