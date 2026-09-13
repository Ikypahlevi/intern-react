import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "../Services/queries/useNotifications";
import { useAuthStore } from "../Stores/authStore";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: notifications = [] } = useGetNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();

  // Lọc thông báo cho User hiện tại (và Admin nếu đang ở giao diện ngoài)
  const myNotifications = notifications.filter(n => 
    n.role === "all" || 
    n.userId === String(user?.id) ||
    (user?.role === "admin" && n.role === "admin")
  );
  const unreadCount = myNotifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      await markReadMutation.mutateAsync(notif.id);
    }
    setIsOpen(false);
    
    // Nếu có highlightId, truyền vào state
    if (notif.highlightId) {
      navigate(notif.link, { state: { highlightOrderId: notif.highlightId } });
    } else {
      navigate(notif.link);
    }
  };

  const handleMarkAll = async () => {
    const unreadIds = myNotifications.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length > 0) {
      await markAllReadMutation.mutateAsync(unreadIds);
    }
  };

  return (
    <div className="relative" ref={notifRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 bg-comic-yellow hover:bg-comic-gold rounded-xl comic-border shadow-comic transition"
      >
        <i className="fa-solid fa-bell text-stone-900 text-lg"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] z-50 flex flex-col font-bubble rounded-lg overflow-hidden">
          <div className="p-3 border-b-[3px] border-black bg-comic-yellow flex items-center justify-between">
            <h3 className="font-comic text-lg uppercase text-black font-black">THÔNG BÁO</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAll} className="text-xs font-bold text-black hover:underline">
                Đánh dấu đã đọc
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {myNotifications.length > 0 ? (
              <ul className="divide-y-[2px] divide-black">
                {myNotifications.map(notif => (
                  <li 
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3 cursor-pointer hover:bg-yellow-50 transition-colors flex items-start gap-3 ${!notif.isRead ? 'bg-yellow-100/50' : 'bg-white'}`}
                  >
                    <div className="mt-1">
                      {notif.isRead ? (
                        <i className="fa-solid fa-envelope-open text-gray-400"></i>
                      ) : (
                        <i className="fa-solid fa-envelope text-comic-red animate-bounce"></i>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-black">{notif.title}</div>
                      <div className="text-xs text-gray-700 mt-1">{notif.message}</div>
                      <div className="text-[10px] text-gray-500 mt-2">
                        {new Date(notif.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500 font-bold">
                Chưa có thông báo nào!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
