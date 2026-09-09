import React from "react";
import { formatCurrency } from "../../../../Utils/format";
import { useUpdateUser, useDeleteUser } from "../../../../Services/queries/useUsers";
import { toast } from "sonner";

export default function UsersTable({ users, columnFilters, setColumnFilters, onEditUser }) {
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleFilterChange = (col, value) => {
    setColumnFilters(prev => ({ ...prev, [col]: value }));
  };

  const handleToggleLock = (user) => {
    const newStatus = user.status === "locked" ? "active" : "locked";
    updateUserMutation.mutate({
      id: user.id,
      status: newStatus
    }, {
      onSuccess: () => {
        toast.success(`Đã ${newStatus === 'locked' ? 'khóa' : 'mở khóa'} tài khoản ${user.name}`);
      }
    });
  };

  const handleDelete = (user) => {
    if (window.confirm(`Bạn có chắc muốn XÓA VĨNH VIỄN tài khoản ${user.name}? Hành động này không thể hoàn tác!`)) {
      deleteUserMutation.mutate(user.id, {
        onSuccess: () => {
          toast.success(`Đã xóa tài khoản ${user.name}`);
        }
      });
    }
  };

  return (
    <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] overflow-hidden flex flex-col">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          {/* Main Headers with Inset Search Fields */}
          <thead className="bg-comic-yellow border-b-[3px] border-black font-comic text-sm uppercase select-none">
            <tr>
              <th className="p-3 align-top border-r-[2px] border-black w-24">
                <div className="flex items-center gap-1 mb-1 font-black">
                  <span>Mã ID</span>
                </div>
                <div className="bg-white border-[2px] border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] flex items-center">
                  <input 
                    value={columnFilters.id}
                    onChange={(e) => handleFilterChange('id', e.target.value)}
                    className="w-full text-black font-bubble text-xs bg-transparent outline-none font-bold" 
                    placeholder="VD: 1" 
                    type="text"
                  />
                </div>
              </th>
              
              <th className="p-3 align-top border-r-[2px] border-black min-w-48">
                <div className="flex items-center justify-between mb-1 font-black">
                  <span>Thành Viên / Nickname</span>
                </div>
                <div className="bg-white border-[2px] border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] flex items-center">
                  <input 
                    value={columnFilters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    className="w-full text-black font-bubble text-xs bg-transparent outline-none font-bold" 
                    placeholder="Tìm tên, bí danh..." 
                    type="text"
                  />
                </div>
              </th>

              <th className="p-3 align-top border-r-[2px] border-black min-w-48">
                <div className="flex items-center justify-between mb-1 font-black">
                  <span>Email & SĐT</span>
                </div>
                <div className="bg-white border-[2px] border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] flex items-center">
                  <input 
                    value={columnFilters.contact}
                    onChange={(e) => handleFilterChange('contact', e.target.value)}
                    className="w-full text-black font-bubble text-xs bg-transparent outline-none font-bold" 
                    placeholder="Email / SĐT..." 
                    type="text"
                  />
                </div>
              </th>

              <th className="p-3 align-top border-r-[2px] border-black min-w-40">
                <div className="flex items-center justify-between mb-1 font-black">
                  <span>Vai Trò</span>
                </div>
                <div className="bg-white border-[2px] border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] flex items-center">
                  <select 
                    value={columnFilters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                    className="w-full text-black font-bubble text-xs bg-transparent outline-none cursor-pointer font-bold"
                  >
                    <option value="ALL">Tất Cả</option>
                    <option value="admin">Quản Trị Viên</option>
                    <option value="customer">Khách Hàng</option>
                  </select>
                </div>
              </th>

              <th className="p-3 align-top border-r-[2px] border-black min-w-32 text-right">
                <div className="flex items-center justify-end gap-1 mb-1 font-black">
                  <span>Tổng Chi Tiêu</span>
                </div>
                <div className="bg-white border-[2px] border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] flex items-center justify-end">
                  <select 
                    value={columnFilters.spend}
                    onChange={(e) => handleFilterChange('spend', e.target.value)}
                    className="w-full text-black font-bubble text-xs bg-transparent outline-none text-right cursor-pointer font-bold"
                  >
                    <option value="ALL">Mọi Mức</option>
                    <option value="TOP">&gt; 10.000.000₫</option>
                    <option value="MID">1tr - 10tr</option>
                    <option value="LOW">&lt; 1.000.000₫</option>
                  </select>
                </div>
              </th>

              <th className="p-3 align-top border-r-[2px] border-black min-w-32 text-center">
                <div className="flex items-center justify-center gap-1 mb-1 font-black">
                  <span>Trạng Thái</span>
                </div>
                <div className="bg-white border-[2px] border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] flex items-center">
                  <select 
                    value={columnFilters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full text-black font-bubble text-xs bg-transparent outline-none cursor-pointer text-center font-bold"
                  >
                    <option value="ALL">Tất Cả</option>
                    <option value="active">Hoạt Động</option>
                    <option value="locked">Bị Khóa</option>
                  </select>
                </div>
              </th>

              <th className="p-3 align-top text-center">
                <div className="mb-1 font-black">
                  <span>Thao Tác</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y-[2px] divide-black font-bubble">
            {users.length > 0 ? users.map((user) => (
              <tr 
                key={user.id} 
                className={`hover:bg-gray-100 transition-colors ${user.status === 'locked' ? 'bg-red-50' : 'bg-white'}`}
              >
                <td className="p-3 border-r-[2px] border-black">
                  <span className="font-comic font-black text-black">#{user.id}</span>
                </td>
                <td className="p-3 border-r-[2px] border-black">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-[2px] border-black bg-white flex items-center justify-center font-comic font-black text-lg shadow-[2px_2px_0px_#000] overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-black text-sm">{user.name}</span>
                      <span className="font-bold text-gray-500 text-xs">{user.nickname || `@user_${user.id}`}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3 border-r-[2px] border-black">
                  <div className="flex flex-col">
                    <span className="font-bold text-black text-sm">{user.email}</span>
                    <span className="font-bold text-gray-500 text-xs">{user.phone || 'Chưa cập nhật'}</span>
                  </div>
                </td>
                <td className="p-3 border-r-[2px] border-black">
                  {user.role === 'admin' ? (
                    <span className="px-2 py-0.5 bg-black text-white border-[2px] border-black font-comic text-xs uppercase font-black shadow-[2px_2px_0px_#000] inline-block">
                      Quản Trị Viên
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-200 text-black border-[2px] border-black font-comic text-xs uppercase font-black shadow-[2px_2px_0px_#000] inline-block">
                      Khách Hàng
                    </span>
                  )}
                </td>
                <td className="p-3 border-r-[2px] border-black text-right">
                  <span className="font-bold text-red-600 block">{formatCurrency(user.totalSpend || 0)}</span>
                  <span className="font-bold text-gray-500 text-xs">{user.orderCount || 0} đơn mua</span>
                </td>
                <td className="p-3 border-r-[2px] border-black text-center">
                  {user.status === 'locked' ? (
                    <span className="px-2 py-0.5 bg-red-600 text-white border-[2px] border-black font-comic text-[10px] uppercase font-black shadow-[2px_2px_0px_#000] inline-block">
                      <i className="fa-solid fa-lock mr-1"></i> Bị Khóa
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-green-500 text-black border-[2px] border-black font-comic text-[10px] uppercase font-black shadow-[2px_2px_0px_#000] inline-block">
                      Hoạt Động
                    </span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onEditUser(user)}
                      className="w-8 h-8 bg-blue-400 text-black border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] hover:bg-blue-500 transition-colors"
                      title="Sửa"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button 
                      onClick={() => handleToggleLock(user)}
                      className={`w-8 h-8 border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] transition-colors ${user.status === 'locked' ? 'bg-green-400 text-black hover:bg-green-500' : 'bg-red-400 text-black hover:bg-red-500'}`}
                      title={user.status === 'locked' ? 'Mở Khóa' : 'Khóa'}
                    >
                      <i className={`fa-solid ${user.status === 'locked' ? 'fa-lock-open' : 'fa-lock'}`}></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(user)}
                      className="w-8 h-8 bg-black text-white border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] hover:bg-gray-800 transition-colors"
                      title="Xóa"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="p-10 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <i className="fa-solid fa-search-minus text-4xl text-gray-400"></i>
                    <span className="font-comic text-xl uppercase font-black text-gray-500">Không tìm thấy tài khoản nào!</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
