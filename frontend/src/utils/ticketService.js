import axios from "axios";

const API_URL = "/api/tickets";

const instance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
  },
});

/**
 *
 * @param {{product: string, description: string}} ticketData
 * @param {string} token
 */
const createTicket = async (ticketData, token) => {
  try {
    const response = await instance.post("/", ticketData, {
      headers: { Authorization: `Bearer ${token}` },
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
 * @param {string} token
 * @returns {[]}
 */
const getTickets = async (token) => {
  try {
    const response = await instance.get("/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("got data!");
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
 * @returns
 */
const getTicket = async (ticketId, token) => {
  try {
    const response = await instance.get(`/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("got data!");
    return response.data;
  } catch (e) {
    console.log(e);
    console.log(e.response.data.message);
    throw e.response.data.message;
  }
};

export default { createTicket, getTicket, getTickets };
