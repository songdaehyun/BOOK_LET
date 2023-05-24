import React, { useState } from "react";

import useDate from "../../../hooks/useDate";
import { TextBtn } from "../../../styles/common/ButtonsStyle";

import { deleteReview } from "../../../apis/BookApi";
import {
	MyReviewDetailBox,
	MyReviewDetailHeadingBox,
	MyReviewPreviewBookInfoBox,
	MyReviewPreviewReviewInfoBox,
} from "../../../styles/Mypage/MypageStyle";
import { Text } from "../../../styles/common/TextsStyle";
import RatingLabel from "../../atoms/RatingLabel";
import ModalLayer from "../../organisms/ModalLayer";

function MyReviewDetail({ review, getMyReviewsApiCall }) {
	const dateTimeSeparation = useDate();

	// 더미
	const [isOpen, setIsOpen] = useState(false);
	const openPopup = () => {
		setIsOpen(true);
	};

	const deleteReviewApiCall = () => {
		setIsOpen(false);
		(async () => {
			await deleteReview(review?.rId).then((res) => {
				if (res === "success") {
					getMyReviewsApiCall();
				}
			});
		})();
	};

	const handleClickDelete = () => {
		deleteReviewApiCall();
	};

	return (
		<>
			<MyReviewDetailBox>
				<MyReviewPreviewBookInfoBox>
					<img src={review?.cover} alt="cover" />
					<div>
						<MyReviewDetailHeadingBox>
							<Text size="14" weight="600" marginBottom="4">
								{review?.title}
							</Text>
							<TextBtn size="14" onClick={openPopup}>
								삭제
							</TextBtn>
						</MyReviewDetailHeadingBox>
						<Text size="12">{review?.author}</Text>
						<Text size="12" color="var(--gray-500)">
							{review?.publisher}
						</Text>
					</div>
				</MyReviewPreviewBookInfoBox>
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
			</MyReviewDetailBox>
			<ModalLayer
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="삭제하시겠습니까?"
				leftLabel="취소"
				rightLabel="삭제"
				action={handleClickDelete}
			/>
		</>
	);
}

export default MyReviewDetail;
