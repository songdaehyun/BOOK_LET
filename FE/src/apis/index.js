import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		"Authorization": localStorage?.getItem("token"),
	},
});

export default api;
