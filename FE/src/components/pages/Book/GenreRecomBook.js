import React, { useEffect, useState } from "react";

import BookListTemplates from "../../templates/Book/BookListTemplates";

import { Span } from "../../../styles/common/TextsStyle";

import { getGenreBookRecom } from "../../../apis/BookApi";
import { initBookRecom, initBookRecomOther } from "../../../apis/init/initBook";
import BannerImg from "../../../assets/images/Banner/genre-recom-book-banner.png";
import useAsync from "../../../hooks/useAsync";

function GenreRecomBook(props) {
	const uName = localStorage.getItem("userName");

	const [state] = useAsync(getGenreBookRecom, uName, initBookRecom, []);
	const { loading, data: recom, error } = state;

	const bannerInfo = {
		title: (
			<>
				오늘&nbsp;
				<Span size="19" weight="bold" color="var(--primary-600)">
					{recom?.genre}
				</Span>
				&nbsp;분야는 어때요?
			</>
		),
		subTitle: (
			<>
				이 장르에서 좋아하실만한
				<br />
				도서를 추천해드려요
			</>
		),
		img: BannerImg,
	};

	const emptyInfo = {
		title: `아직 관련 내역이 없어요`,
		subTitle: (
			<>
				좋아요와 리뷰를 남겨주시면
				<br /> 마음에 들 추천을 해드릴게요
			</>
		),
		buttonLabel: "책 탐색하러 가기",
		path: "/book/search",
	};

	return (
		<BookListTemplates
			title={bannerInfo.title}
			subTitle={bannerInfo.subTitle}
			img={bannerInfo.img}
			type={recom?.type}
			books={recom?.books}
			emptyInfo={emptyInfo}
			loading={loading}
			error={error}
		/>
	);
}

export default GenreRecomBook;
