import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../../../apis/BookApi";
import { initReview } from "../../../apis/init/initBook";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { Container } from "../../../styles/common/ContainingsStyle";
import { Span, Text } from "../../../styles/common/TextsStyle";
import InputRatingSection from "../../molecules/Book/InputRatingSection";
import CommentInput from "../../molecules/Input/CommentInput";
import CommentList from "../../molecules/Sentence/CommentList";

function BookReview({}) {
	const { bId } = useParams();
	const uId = localStorage.getItem("userId");

	const [reviews, setReviews] = useState();

	const {
		data,
		isReviewed,
		apiCall: reviewApiCall,
		isFetching,
	} = useInfiniteScroll({ bId, uId }, getReview, 5, initReview);

	useEffect(() => {
		setReviews(data);
	}, [data]);

	return (
		<Container marginTop="24">
			<Text size="19">
				<Span weight="bold">리뷰</Span>
				<Span marginLeft="8" marginRight="8" color="var(--gray-300)">
					|
				</Span>
				<Span>{reviews?.length || 0}</Span>
			</Text>
			{!isReviewed && <InputRatingSection />}
			<CommentInput
				type="리뷰"
				isReviewed={isReviewed}
				setComments={setReviews}
				getCommentApiCall={reviewApiCall}
			/>
			<CommentList
				comments={reviews}
				type="리뷰"
				setComments={setReviews}
				getCommentApiCall={reviewApiCall}
			/>
		</Container>
	);
}

export default BookReview;
