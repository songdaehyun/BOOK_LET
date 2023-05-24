import React, { useEffect, useState } from "react";
import { initMyReviews } from "../../../apis/init/initBook";
import { getMyPreviewReview, getMyReview } from "../../../apis/userApi";
import { Container } from "../../../styles/common/ContainingsStyle";

import MoreBar from "../../molecules/Bar/MoreBar";
import MyReviewPreveiwCardGroup from "../../molecules/Mypage/MyReviewPreveiwCardGroup";

function MyReviewPreviewSection(props) {
	const [reviews, setReviews] = useState();

	const uName = localStorage.getItem("userName");

	useEffect(() => {
		(async () => {
			await getMyPreviewReview(uName)
				.then(initMyReviews)
				.then((res) => {
					setReviews(res);
				});
		})();
	}, []);

	return (
		<Container marginTop="36" paddingLeft="16" paddingRight="16">
			<MoreBar title="내가 쓴 리뷰" path="review" />
			<MyReviewPreveiwCardGroup reviews={reviews} />
		</Container>
	);
}

export default MyReviewPreviewSection;
