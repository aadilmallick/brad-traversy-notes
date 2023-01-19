import axios from "axios";

const API_URL = "/api/users";

const instance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
  },
});

/**
 *
 * @param {{name: string, email: string, password: string}} userData
 * @returns {{name: string, email: string, token: string}}
 */
const registerUser = async (userData) => {
  try {
    const response = await instance.post("/", {
      username: userData.name,
      email: userData.email,
      password: userData.password,
    });

    console.log("posted!!");
    return response.data;
  } catch (e) {
    console.log(e);
    console.log(e.response.data.message);
    throw e.response.data.message;
  }
};

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {{name: string, token: string, email: string}}
 */
const loginUser = async (email, password) => {
  try {
    console.log("email and password: ", email, password);
    const response = await instance.post("/login", {
      email,
      password,
    });

    console.log("logged in!");
    return response.data;
  } catch (e) {
    console.log(e);
    console.log(e.response.data.message);
    throw e.response.data.message;
  }
};

/**
 *
 * @param {{name: string, email: string, token: string}} user
 */
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 *
 * @returns {{name: string, email: string, token: string} | null} gets the user object from local storage, else returns null.
 */
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  registerUser,
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  logout,
  loginUser,
};
