import api from "./index";

export const createPost = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: "/sns/paragraph",
			data: data,
		});

		return res;
	} catch (err) {
		console.error(err);
	}
};

export const getPost = async (sId, uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/sns/paragraph/${sId}?userId=${uId}`,
		});

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getMyPost = async (uId, size, page) => {
	try {
		const res = await api({
			method: "GET",
			url: `/sns/paragraph/mylist/${uId}?size=${size}&page=${page}`,
		});

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getFollowingPost = async (uId, size, page) => {
	try {
		const res = await api({
			method: "GET",
			url: `/sns/paragraph/following/${uId}?size=${size}&page=${page}`,
		});

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const deletePost = async (sId) => {
	try {
		const res = await api({
			method: "DELETE",
			url: `/sns/paragraph/${sId}`,
		});

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const postScrap = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/sns/scrap`,
			data: data,
		});

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getScrappedPost = async (uId, size, page) => {
	try {
		const res = await api({
			method: "GET",
			url: `/sns/scrap/${uId}?page=${page}&size=${size}`,
		});

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getScrapCount = async (uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/sns/scrap/count/${uId}`,
		});

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getSentenceRecom = async (uName) => {
	try {
		const res = await api({
			method: "GET",
			url: `/recom/paragraph/all/${uName}`,
		});

		return res?.data;
	} catch (err) {
		console.error(err);
	}
};
export const getSentenceRecomPreview = async (uName) => {
	try {
		const res = await api({
			method: "GET",
			url: `/recom/paragraph/pre/${uName}`,
		});

		return res?.data;
	} catch (err) {
		console.error(err);
	}
};

// 댓글 api
export const postComment = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: "/comment/",
			data: data,
		});

		return res?.data;
	} catch (err) {
		console.error(err);
	}
};

export const postReply = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: "/comment/reply",
			data: data,
		});

		return res;
	} catch (err) {
		console.error(err);
	}
};

export const getComment = async (sId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/comment/${sId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const deleteComment = async (cId) => {
	try {
		const res = await api({
			method: "DELETE",
			url: `/comment/${cId}`,
		});

		return res?.data?.message;
	} catch (err) {
		console.error(err);
	}
};

export const deleteReply = async (sId) => {
	try {
		const res = await api({
			method: "DELETE",
			url: `/comment/reply/${sId}`,
		});

		return res;
	} catch (err) {
		console.error(err);
	}
};
