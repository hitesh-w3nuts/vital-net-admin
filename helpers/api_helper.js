import axios from "axios";
import { getToken } from "./Helper";

const axiosApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		appversion: "1.1",
	},
	responseType: "json",
});

export async function get(url, config = {}) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return await axiosApi
		.get(url, { ...config })
		.then((response) => response.data)
		.catch((error) => error);
}

export async function post(url, data, config = {}) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return axiosApi
		.post(url, { ...data }, { ...config })
		.then((response) => response.data)
		.catch((error) => error);
}

export async function multipart_post(url, data) {
	return axios({
		url: process.env.NEXT_PUBLIC_API_URL + url,
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: getToken(),
		},
	})
		.then((response) => response.data)
		.catch((error) => error);
}

export async function put(url, data, config = {}) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then((response) => response.data)
		.catch((error) => error);
}

export async function del(url, config = {}) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return await axiosApi
		.delete(url, { ...config })
		.then((response) => response.data)
		.catch((error) => error);
}
