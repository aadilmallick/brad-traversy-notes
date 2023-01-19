import axios from "axios";

const DOMAIN_URL =
  import.meta.env.MODE === "production"
    ? "https://notes-aadil-mallick.onrender.com/"
    : "http://localhost:3000";
const API_URL = "/api/tickets";

const instance = axios.create({
  baseURL: `${DOMAIN_URL}${API_URL}`,
  headers: {
    Accept: "application/json",
  },
});

/**
 *
 * @param {string} text
 * @param {string} ticketId
 * @param {string} token
 * @returns
 */
const createNote = async (text, ticketId, token) => {
  try {
    const response = await instance.post(
      `/${ticketId}/notes`,
      { text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

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
 * @param {string} ticketId
 * @param {string} token
 */
const getNotes = async (ticketId, token) => {
  try {
    const response = await instance.get(`/${ticketId}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    console.log(e.response.data.message);
    throw e.response.data.message;
  }
};

export default { createNote, getNotes };
