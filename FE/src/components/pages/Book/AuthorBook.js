import React, { useEffect } from "react";

import BookListTemplates from "../../templates/Book/BookListTemplates";

import { useParams } from "react-router-dom";
import { Span } from "../../../styles/common/TextsStyle";

import BannerImg from "../../../assets/images/Banner/author-book-banner.png";
import { getAuthorBooks } from "../../../apis/BookApi";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { initAuthorBooks } from "../../../apis/init/initBook";

function AuthorBook(props) {
	const { aId } = useParams();

	const { data: books, isFetching } = useInfiniteScroll(aId, getAuthorBooks, 9, initAuthorBooks);

	const bannerInfo = {
		title: (
			<>
				<Span size="19" weight="bold" color="var(--primary-600)">
					{books[0]?.author}&nbsp;
				</Span>
				작가의
				<br />
				책이에요
			</>
		),
		subTitle: <>작가님은 어떤 책을 쓰셨을까요?</>,
		img: BannerImg,
	};

	return (
		<BookListTemplates
			title={bannerInfo.title}
			subTitle={bannerInfo.subTitle}
			img={bannerInfo.img}
			books={books}
		/>
	);
}

export default AuthorBook;
