import { useState } from "react";
import "./App.css";

const INITIAL_USERS = [
  { id: 1, name: "Nguyễn Văn An", email: "an.nguyen@example.com", role: "Admin", avatar: "👨‍💻" },
  { id: 2, name: "Trần Thị Bình", email: "binh.tran@example.com", role: "User", avatar: "👩‍💼" },
  { id: 3, name: "Lê Hoàng Cường", email: "cuong.le@example.com", role: "Editor", avatar: "🧑‍🎨" },
];

const ROLES = ["User", "Editor", "Admin"];

function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [formData, setFormData] = useState({ id: null, name: "", email: "", role: "User", avatar: "👤" });
  const [isEditing, setIsEditing] = useState(false);

  // Random avatar for new users
  const getRandomAvatar = () => {
    const avatars = ["🧑‍🦱", "👨‍🦰", "👱‍♂️", "👩‍🦰", "🧔‍♂️", "👵", "👴", "👧", "👦"];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    if (isEditing) {
      setUsers((prev) =>
        prev.map((user) => (user.id === formData.id ? formData : user))
      );
      setIsEditing(false);
    } else {
      const newUser = {
        ...formData,
        id: Date.now(),
        avatar: formData.avatar === "👤" ? getRandomAvatar() : formData.avatar,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    
    // Reset form
    setFormData({ id: null, name: "", email: "", role: "User", avatar: "👤" });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ id: null, name: "", email: "", role: "User", avatar: "👤" });
  };

  const getRoleColor = (role) => {
    switch(role) {
      case "Admin": return "bg-rose-100 text-rose-700 border-rose-200";
      case "Editor": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-indigo-100 text-indigo-700 border-indigo-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-200 p-6 md:p-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-300 opacity-20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-300 opacity-20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Quản Lý <span className="text-gradient">Thành Viên</span> 👥
          </h1>
          <p className="text-slate-500 font-medium">Thêm, sửa và xóa người dùng dễ dàng</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= PHẦN TRÁI: FORM ================= */}
          <div className="w-full lg:w-[380px] shrink-0 sticky top-6">
            <div className="glass-panel rounded-3xl shadow-xl p-8 border border-white">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {isEditing ? "✏️ Cập nhật" : "✨ Thêm mới"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Họ và Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập tên..."
                    className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email..."
                    className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Vai trò (Role)</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 cursor-pointer"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95"
                  >
                    {isEditing ? "Lưu Thay Đổi" : "Thêm Thành Viên"}
                  </button>
                  
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-5 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 active:scale-95"
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* ================= PHẦN PHẢI: DANH SÁCH ================= */}
          <div className="flex-1 w-full">
            <div className="glass-panel rounded-3xl p-6 shadow-sm border border-white">
              
              <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-xl font-bold text-slate-800">Danh sách tài khoản</h2>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-full text-sm">
                  {users.length} thành viên
                </span>
              </div>

              {users.length === 0 ? (
                <div className="py-16 text-center opacity-60">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-bold text-slate-700">Chưa có ai ở đây</h3>
                  <p className="text-slate-500 mt-2">Hãy dùng biểu mẫu bên trái để thêm người dùng nhé!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.map((user) => (
                    <div 
                      key={user.id} 
                      className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                          {user.avatar}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-slate-800 truncate" title={user.name}>{user.name}</h3>
                          <p className="text-sm text-slate-500 truncate mb-2" title={user.email}>{user.email}</p>
                          <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
