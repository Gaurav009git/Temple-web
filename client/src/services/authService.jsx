import api from "./api";

export const authService = {
  adminLogin: async (credentials) => {
    const res = await api.post("/auth/admin/login", credentials);
    return res.data;
  },
};

export default authService;