import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import BookDetailOverview from "../../molecules/Book/BookDetailOverview";

import { getBook } from "../../../apis/BookApi";
import { initBook } from "../../../apis/init/initBook";
import { SeparationBar } from "../../../styles/common/BarsStyle";
import { Container, OverflowHiddenBox } from "../../../styles/common/ContainingsStyle";
import BookBuyButton from "../../atoms/Button/BookBuyButton";
import LikeToolbar from "../../molecules/Bar/LikeToolbar";
import TabBar from "../../molecules/Bar/TabBar";
import AuthorOthreBookPreview from "../../organisms/Book/AuthorOtherBookPreview";
import BookDescription from "../../organisms/Book/BookDescription";
import BookRatingInfo from "../../organisms/Book/BookRatingInfo";
import BookReview from "../../organisms/Book/BookReview";

function BookDetail(props) {
	const uId = localStorage.getItem("userId");
	const { bId } = useParams();

	const [book, setBook] = useState();

	useEffect(() => {
		(async () => {
			await getBook(bId, uId)
				.then((res) => initBook(res))
				.then((res) => {
					setBook(res);
				});
		})();
	}, []);

	return (
		<>
			<ReturnNavigationBar title={book?.title} />
			<OverflowHiddenBox paddingLeft="16" paddingRight="16">
				<BookDetailOverview
					cover={book?.cover}
					title={book?.title}
					author={book?.author}
					publisher={book?.publisher}
					genres={book?.genres}
				/>
				<Container marginTop="24" marginBottom="24">
					<LikeToolbar
						imgs={book?.likeProfileImg}
						count={book?.likeCnt}
						isLiked={book?.isLiked}
					/>
				</Container>
				<BookBuyButton isbn={bId} />
				<BookDescription description={book?.description} />
				<AuthorOthreBookPreview aId={book?.aId} authorOtherBooks={book?.authorOtherBooks} />
			</OverflowHiddenBox>
			<SeparationBar top="40" bottom="40" />
			<Container paddingLeft="16" paddingRight="16" paddingBottom="56">
				<BookRatingInfo rating={parseInt(book?.rating)} />
				<BookReview />
			</Container>
			<TabBar selected={2} />
		</>
	);
}

export default BookDetail;
