import React from "react";
import { useNavigate } from "react-router-dom";
import useDate from "../../../hooks/useDate";
import { Hr } from "../../../styles/common/CommonStyle";
import { Text } from "../../../styles/common/TextsStyle";
import {
	MyReviewPreviewBookInfoBox,
	MyReviewPreviewCardBox,
	MyReviewPreviewReviewInfoBox,
} from "../../../styles/Mypage/MypageStyle";
import RatingLabel from "../../atoms/RatingLabel";

function MyReviewPreviewCard({ review }) {
	const navigate = useNavigate();
	const dateTimeSeparation = useDate();

	const handleClickCard = () => {
		navigate(`/book/${review?.isbn}`);
	};

	return (
		<MyReviewPreviewCardBox onClick={handleClickCard}>
			<MyReviewPreviewBookInfoBox>
				<img src={review?.cover} alt="cover" />
				<div>
					<Text size="14" weight="600" marginBottom="4">
						{review?.title}
					</Text>
					<Text size="12">{review?.author}</Text>
					<Text size="12" color="var(--gray-500)">
						{review?.publisher}
					</Text>
				</div>
			</MyReviewPreviewBookInfoBox>
			<Hr top="8" bottom="8" />
			<MyReviewPreviewReviewInfoBox>
				<div>
					<RatingLabel rating={parseInt(review?.rating)} />
					<Text size="14" marginTop="8" marginBottom="8">
						{review?.content}
					</Text>
				</div>
				<Text size="12" color="var(--gray-500)">
					{dateTimeSeparation(review?.date)}
				</Text>
			</MyReviewPreviewReviewInfoBox>
		</MyReviewPreviewCardBox>
	);
}

export default MyReviewPreviewCard;
