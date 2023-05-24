import React from "react";

import { CommentUploadBtn } from "../../../styles/common/ButtonsStyle";

import UploadArrow from "../../atoms/Icon/UploadArrow";

function CommentUploadButton({ isCommentValid }) {
	return (
		<CommentUploadBtn isValid={isCommentValid}>
			<UploadArrow isValid={isCommentValid} />
		</CommentUploadBtn>
	);
}

export default CommentUploadButton;
