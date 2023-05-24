import React from "react";

import useDate from "../../../hooks/useDate";

import { Span, Text } from "../../../styles/common/TextsStyle";
import { PreviewCommentContainer } from "../../../styles/Sentence/PostPreviewStyle";

import commentIcon from "../../../assets/icons/comment-icon.svg";

function PreviewComment({ post, isMy }) {
	const dateTimeSeparation = useDate();
	
	return (
		<PreviewCommentContainer>
			<div>
				<img src={commentIcon} alt="comment"/>
				<Text size="14" color="var(--gray-500)">
					<Span size="14" weight="bold">
						{post?.commentCnt}
					</Span>
					개의 댓글
				</Text>
			</div>
			{!isMy && (
				<Text size="14" color="var(--gray-500)">
					{dateTimeSeparation(post?.date)}
				</Text>
			)}
		</PreviewCommentContainer>
	);
}

export default PreviewComment;
