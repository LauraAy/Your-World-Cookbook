import http from "../http-common";

const register = (username, email, password) => {
  return http.post("/auth/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return http.post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getOne = (id) => {
  return http.get(`/users/${id}`)
}

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  update,
  getOne
};

export default AuthService;