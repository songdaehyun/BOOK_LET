import api from "./index";

export const join = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/auth/signup`,
			data: data,
		});

		return res.data.message;
	} catch (err) {
		console.log(err);
	}
};

export const login = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/auth/login`,
			data: data,
		});

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const logout = async () => {
	try {
		const res = await api({
			method: "POST",
			url: `/auth/logout`,
		});

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const updateMyInfo = async (uName, data) => {
	try {
		const res = await api({
			method: "PUT",
			url: `/auth/update/${uName}`,
			data: data,
		});

		return res.data?.message;
	} catch (err) {
		console.log(err);
	}
};

export const updateMyImg = async (uName, data) => {
	try {
		const res = await api({
			method: "PUT",
			url: `/auth/update/img/${uName}`,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: data,
		});

		return res?.data?.message;
	} catch (err) {
		console.log(err);
	}
};

export const defaultImgSetting = async (uName) => {
	try {
		const res = await api({
			method: "DELETE",
			url: `/auth/update/img/${uName}`,
		});

		return res?.data?.message;
	} catch (err) {
		console.log(err);
	}
};

export const deleteMyAccount = async (uId) => {
	try {
		const res = await api({
			method: "DELETE",
			url: `/auth/delete`,
		});

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const updateMyPw = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/auth/setpw`,
			data: data,
		});

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const checkId = async (data) => {
	try {
		const res = await api({
			method: "GET",
			url: `/auth/check/username/${data}`,
		});

		return res.data.message;
	} catch (err) {
		console.log(err);
	}
};

export const checkNickname = async (data) => {
	try {
		const res = await api({
			method: "GET",
			url: `/auth/check/nickname/${data}`,
		});

		return res.data.message;
	} catch (err) {
		console.log(err);
	}
};

export const checkEmail = async (data) => {
	try {
		const res = await api({
			method: "GET",
			url: `/auth/check/email/${data}`,
		});

		return res.data.message;
	} catch (err) {
		console.log(err);
	}
};
