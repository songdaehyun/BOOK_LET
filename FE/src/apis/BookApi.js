import api from "./index";

export const getBook = async (bId, uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/book/${bId}?userId=${uId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const postLike = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/book/like`,
			data: data,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getAuthorBooks = async (aId, size, page) => {
	try {
		const res = await api({
			method: "GET",
			url: `/book/author/${aId}?size=${size}&page=${page}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

// 도서 추천
export const getCoverBookRecomPre = async (uId) => {
	const res = await api({
		method: "GET",
		url: `/recom/cover/pre/${uId}`,
	});

	return res.data;
};

export const getCoverBookRecom = async (uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/recom/cover/all/${uId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getRatingBookRecomPre = async (uId) => {
	const res = await api({
		method: "GET",
		url: `/recom/score/pre/${uId}`,
	});

	return res.data;
};

export const getRatingBookRecom = async (uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/recom/score/all/${uId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getBookSearch = async (title, size, page) => {
	const titleParam = encodeURIComponent(title);

	try {
		const res = await api({
			method: "GET",
			url: `/book/search?bookTitle=${titleParam}&size=${size}&page=${page}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getLikeBookRecomPre = async (uId) => {
	const res = await api({
		method: "GET",
		url: `/recom/like/pre/${uId}`,
	});

	return res.data;
};

export const getLikeBookRecom = async (uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/recom/like/all/${uId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

// 리뷰 api
export const getReview = async (id, size, page) => {
	const isbn = id?.bId;
	const uId = id?.uId;
	try {
		const res = await api({
			method: "GET",
			url: `/review/${isbn}?userId=${uId}&size=${size}&page=${page}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getGenreBookRecomPre = async (uId) => {
	const res = await api({
		method: "GET",
		url: `/recom/genre/pre/${uId}`,
	});

	return res.data;
};

export const getGenreBookRecom = async (uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/recom/genre/all/${uId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const deleteReview = async (rId) => {
	try {
		const res = await api({
			method: "DELETE",
			url: `/review/${rId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const getUserBookRecomPre = async (uId) => {
	const res = await api({
		method: "GET",
		url: `/recom/user/pre/${uId}`,
	});

	return res.data;
};

export const getUserBookRecom = async (uId) => {
	try {
		const res = await api({
			method: "GET",
			url: `/recom/user/all/${uId}`,
		});

		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const postReview = async (data) => {
	try {
		const res = await api({
			method: "POST",
			url: `/review`,
			data: data,
		});

		return res.data.message;
	} catch (err) {
		console.error(err);
	}
};

export const updateReview = async (cId, data) => {
	try {
		const res = await api({
			method: "PUT",
			url: `/review/${cId}`,
			data: data,
		});

		return res.data.message;
	} catch (err) {
		console.error(err);
	}
};


