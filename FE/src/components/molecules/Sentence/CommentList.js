import React from "react";
import { Container } from "../../../styles/common/ContainingsStyle";
import Comment from "../Comment";

function CommentList({ comments, type, setComments, getCommentApiCall,editReview, setEditReview }) {
	return (
		<Container marginTop="16">
			{comments?.map((comment) => (
				<Comment
					key={comment?.cId}
					comment={comment}
					type={type}
					setComments={setComments}
					getCommentApiCall={getCommentApiCall}
					editReview={editReview}
					setEditReview={setEditReview}
				/>
			))}
		</Container>
	);
}

export default CommentList;
