export const initSentence = (raw) => {
	return {
		uId: raw?.user?.userId,
		uName: raw?.user?.username,
		nickname: raw?.user.nickname,
		profileImg: raw?.user?.userImage,
		isFollowed: raw?.user?.isFollowing,

		isbn: raw?.book?.bookIsbn,
		title: raw?.book?.bookTitle,
		author: raw?.book?.bookAuthor,
		cover: raw?.book?.bookImage,

		sId: raw?.paragraph?.paragraphId,
		content: raw?.paragraph?.paragraphContent,
		page: raw?.paragraph?.paragraphPage,
		color: raw?.paragraph?.paragraphColor,
		date: raw?.paragraph?.createdDate,

		isScraped: raw?.scrapInfo?.userScrap,
		scrapImgs: raw?.scrapInfo?.scrapUserImages,
		scrapCount: raw?.scrapInfo?.scrapCount,
	};
};

export const initSentenceList = (raw) => {
	return {
		hasNextPage: raw?.hasNextPage,
		contents: raw?.paragraphs?.map((sentence) => {
			return {
				nickname: sentence?.userInfo?.nickname,
				profileImg: sentence?.userInfo?.userImage,

				isbn: sentence?.bookIsbn,
				title: sentence?.bookTitle,
				author: sentence?.bookAuthor,
				cover: sentence?.bookImage || sentence?.book?.bookImage,

				sId: sentence?.paragraphId,
				content: sentence?.paragraphContent,
				page: sentence?.paragraphPage,
				color: sentence?.paragraphColor,
				date: sentence?.createdDate,

				isScraped: sentence?.scrapInfo?.userScrap,
				scrapImgs: sentence?.scrapInfo?.scrapUserImages,
				scrapCount: sentence?.scrapInfo?.scrapCount,

				commentCnt: sentence?.commentCnt,
			};
		}),
	};
};

export const initComment = (raw) => {
	return raw?.map((comment) => {
		return {
			uId: comment?.userId,
			cId: comment?.commentId,
			img: comment?.userImage,
			nickname: comment?.nickname,
			img: comment?.userImage,
			content: comment?.commentContent,
			date: comment?.createdDate,
			group: comment?.commentGroup,
			depth: comment?.commentDepth,
		};
	});
};
