import api from "./api";

const AuthService = {
  register: (username, email, password) => {
    return api.post("/auth/register", { username, email, password });
  },
  login: async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => { localStorage.removeItem("user"); },
  getCurrentUser: () => JSON.parse(localStorage.getItem("user"))
};

export default AuthService;