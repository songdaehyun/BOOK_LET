export const initBook = (raw) => {
	return {
		cover: raw?.bookImage,
		title: raw?.bookTitle,
		aId: raw?.authorId,
		author: raw?.authorName,
		publisher: raw?.bookPublisher,
		genres: raw?.genreNames,
		description: raw?.bookDescription,
		isbn: raw?.bookIsbn,
		authorOtherBooks: raw?.authorOtherBooks,
		isLiked: raw?.bookLike,
		likeCnt: raw?.likesNumber,
		likeProfileImg: raw?.likesUserImages,
		rating: raw?.bookGrade,
		isReviewed: raw?.reviewed,
	};
};

export const initMyReviews = (raw) => {
	return raw?.map((review) => {
		return {
			cover: review?.bookImgPath,
			title: review?.bookTitle,
			author: review?.authorName,
			publisher: review?.bookPublisher,
			isbn: review?.bookIsbn,
			rating: review?.reviewGrade,
			content: review?.reviewContent,
			date: review?.createdDate,
			rId: review?.reviewId,
		};
	});
};

export const initReview = (raw) => {
	return {
		hasNextPage: raw?.hasNextPage,
		isReviewed: raw?.reviewed,
		contents: raw?.reviews?.map((review) => {
			return {
				uId: review?.userInfo?.userId,
				cId: review?.reviewId,
				nickname: review?.userInfo?.nickname,
				img: review?.userInfo?.userImage,
				content: review?.reviewContent,
				rating: review?.reviewGrade,
				date: review?.createdDate,
			};
		}),
	};
};

export const initBookSearch = (raw) => {
	return {
		hasNextPage: raw?.hasNext,
		contents: raw?.bookList?.map((book) => {
			return {
				author: book?.authorName,
				cover: book?.bookImage,
				bId: book?.bookIsbn,
				title: book?.bookTitle,
			};
		}),
	};
};

export const initAuthorBooks = (raw) => {
	return {
		hasNextPage: raw?.hasNext,
		contents: raw?.authorBooks?.map((book) => {
			return {
				author: book?.authorName,
				cover: book?.bookImage,
				isbn: book?.bookIsbn,
				title: book?.bookTitle,
			};
		}),
	};
};

export const initBookRecom = (raw) => {
	return {
		type: raw?.recommendType,
		age: raw?.age,
		gender: raw?.sex === 1 ? "남성" : "여성",
		genre: raw?.genreName,
		nickname: raw?.nickname,
		books: raw?.recommend?.map((book) => {
			return {
				cover: book?.bookImgPath,
				title: book?.bookTitle,
				author: book?.authorName,
				isbn: book?.bookIsbn,
			};
		}),
	};
};

export const initBookRecomOther = (raw) => {
	console.log(raw);
	return {
		type: raw?.recommendType,
		genre: raw?.genreName,
		books: raw?.data?.map((book) => {
			return {
				cover: book?.bookImgPath,
				title: book?.bookTitle,
				author: book?.authorName,
				isbn: book?.bookIsbn,
			};
		}),
	};
};
