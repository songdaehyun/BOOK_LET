import React from "react";
import { Hr } from "../../../styles/common/CommonStyle";
import { Container } from "../../../styles/common/ContainingsStyle";
import MyReviewDetail from "../../molecules/Mypage/MyReviewDetail";

function MyReviewList({ reviews, getMyReviewsApiCall }) {
	return (
		<Container marginTop="24">
			{reviews?.map((review, idx) => (
				<>
					<MyReviewDetail
						key={idx}
						review={review}
						getMyReviewsApiCall={getMyReviewsApiCall}
					/>
					<Hr top="16" bottom="16" />
				</>
			))}
		</Container>
	);
}

export default MyReviewList;
