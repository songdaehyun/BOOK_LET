export const initTag = (raw) => {
	return raw?.map((tag) => {
		return {
			id: tag?.hashtag_id,
			title: tag?.hashtag_name,
		};
	});
};

export const initCover = (raw) => {
	return raw?.map(({ book_isbn, book_img }) => {
		return {
			id: book_isbn,
			img: book_img,
		};
	});
};
