import api from "./api";

export const userService = {
  getAll: async () => {
    return await api.get("/users");
  },
  getById: async (id) => {
    return await api.get(`/users/${id}`);
  },
  create: async (data) => {
    return await api.post("/users", data);
  },
  update: async (id, data) => {
    return await api.patch(`/users/${id}`, data);
  },
  delete: async (id) => {
    return await api.delete(`/users/${id}`);
  },
};
