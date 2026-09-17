import React, { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  // Tự động tải lại trang nếu lỗi là do module chunk cũ không còn tồn tại trên server sau khi deploy
  useEffect(() => {
    const isChunkLoadError = 
      error?.message?.includes("Failed to fetch dynamically imported module") || 
      error?.message?.includes("Importing a module script failed");

    if (isChunkLoadError) {
      const reloadCount = parseInt(sessionStorage.getItem("chunk_reload_count") || "0", 10);
      if (reloadCount < 2) {
        sessionStorage.setItem("chunk_reload_count", (reloadCount + 1).toString());
        window.location.reload();
      }
    }
  }, [error]);

  // Xóa biến đếm nếu không có lỗi chunk (trang chạy bình thường)
  useEffect(() => {
    const isChunkLoadError = 
      error?.message?.includes("Failed to fetch dynamically imported module") || 
      error?.message?.includes("Importing a module script failed");
      
    if (!isChunkLoadError) {
      sessionStorage.removeItem("chunk_reload_count");
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-6">
      <div className="comic-border shadow-comic-lg bg-white p-8 max-w-lg text-center rounded-2xl">
        <h1 className="text-6xl mb-4">💥</h1>
        <h2 className="font-comic text-3xl text-red-600 mb-2 uppercase">Oppps! Có lỗi xảy ra</h2>
        <p className="font-bubble text-gray-700 font-bold mb-6">
          {error?.statusText || error?.message || "Hình như hệ thống đang gặp chút trục trặc nhỏ."}
        </p>
        <Link 
          to="/"
          className="inline-block bg-comic-yellow text-black font-comic text-xl px-8 py-3 comic-border shadow-comic hover:bg-black hover:text-white transition-colors"
        >
          QUAY VỀ TRANG CHỦ
        </Link>
      </div>
    </div>
  );
}
