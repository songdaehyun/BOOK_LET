import api from "./index";

export const postTaste = async (uName, data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/user/taste/${uName}`,
			data: data,
		});

		return res.data.message;
	} catch (err) {
		console.log(err);
	}
};

export const getMyInfo = async (uName) => {
	try {
		const res = await api({
			method: "GET",
			url: `/user/${uName}`,
		});

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const getMyPreviewReview = async (uName) => {
	try {
		const res = await api.get(`/user/review/pre/${uName}`);

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const getMyReview = async (uName) => {
	try {
		const res = await api.get(`/user/review/all/${uName}`);

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const getMyPreviewLike = async (uName) => {
	try {
		const res = await api.get(`/user/like/book/${uName}`);

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const getMyLike = async (uName) => {
	try {
		const res = await api.get(`/user/like/book/all/${uName}`);

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const getFollow = async (uName) => {
	try {
		const res = await api({
			method: "GET",
			url: `/user/follow/${uName}`,
		});

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const postFollow = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/user/follow`,
			data: data,
		});

		return res?.data?.message;
	} catch (err) {
		console.log(err);
	}
};

export const getTagExample = async () => {
	try {
		const res = await api.get("/user/prefer/hashtag");

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const getCoverExample = async () => {
	try {
		const res = await api.get("/user/prefer/cover");

		return res.data.data;
	} catch (err) {
		console.log(err);
	}
};
