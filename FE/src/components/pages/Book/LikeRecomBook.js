import React, { useEffect, useState } from "react";

import BookListTemplates from "../../templates/Book/BookListTemplates";

import { getLikeBookRecom } from "../../../apis/BookApi";
import { initBookRecom, initBookRecomOther } from "../../../apis/init/initBook";
import BannerImg from "../../../assets/images/Banner/like-recom-book-banner.png";
import useAsync from "../../../hooks/useAsync";

function LikeRecomBook(props) {
	const uName = localStorage.getItem("userName");

	const [likeState] = useAsync(getLikeBookRecom, uName, initBookRecom, []);
	const { loading, data: recom, error } = likeState;

	const bannerInfo = {
		title: (
			<>
				이것들 또한
				<br /> 좋아하게 될거예요
			</>
		),
		subTitle: (
			<>
				좋아요를 누르신 도서와
				<br />
				유사한 도서를 추천해드려요.
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
			emptyInfo={emptyInfo}
			type={recom?.type}
			books={recom?.books}
			loading={loading}
			error={error}
		/>
	);
}

export default LikeRecomBook;
