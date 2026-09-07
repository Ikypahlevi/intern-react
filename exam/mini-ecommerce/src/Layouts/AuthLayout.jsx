import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col text-stone-900 bg-[#FFFCEB] antialiased selection:bg-comic-yellow selection:text-black">
      <Header />
      
      {/* Không dùng Breadcrumbs cho trang Auth để giao diện thoáng hơn */}
      
      <main className="flex-1 flex items-center justify-center py-10 px-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
