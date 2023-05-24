import React, { useEffect, useState } from "react";

import { Container } from "../../../styles/common/ContainingsStyle";
import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import MyReviewList from "../../organisms/Mypage/MyReviewList";

import { initMyReviews } from "../../../apis/init/initBook";
import { getMyReview } from "../../../apis/userApi";
import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";

function MyReview(props) {
	const [reviews, setReviews] = useState([]);

	const uName = localStorage.getItem("userName");

	const getMyReviewsApiCall = () => {
		(async () => {
			await getMyReview(uName)
				.then(initMyReviews)
				.then((res) => {
					setReviews(res);
				});
		})();
	};

	useEffect(() => {
		getMyReviewsApiCall();
	}, []);

	const isArrEmpty = useArr();

	const emptyInfo = {
		title: "작성한 리뷰가 없어요",
		subTitle: (
			<>
				평점과 리뷰가 있으면
				<br />
				더욱 알맞는 도서 추천을 해드릴 수 있어요!
			</>
		),
		buttonLabel: "도서 탐색하러 가기",
		path: "/book",
	};

	return (
		<div>
			<ReturnNavigationBar title="내가 쓴 리뷰" />
			<Container paddingTop="75" paddingLeft="16" paddingRight="16">
				{isArrEmpty(reviews) ? (
					<Empty
						title={emptyInfo.title}
						subTitle={emptyInfo.subTitle}
						buttonLabel={emptyInfo.buttonLabel}
						path={emptyInfo.path}
					/>
				) : (
					<MyReviewList reviews={reviews} getMyReviewsApiCall={getMyReviewsApiCall} />
				)}
			</Container>
		</div>
	);
}

export default MyReview;
