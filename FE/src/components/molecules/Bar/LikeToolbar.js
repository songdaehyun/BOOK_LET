import React from "react";

import ReactionInfo from "../ReactionInfo";

import { ReactionInfoContainer } from "../../../styles/Sentence/PostPreviewStyle";
import LikeButton from "../../atoms/Button/LikeButton";

function LikeToolbar({ imgs, count, isLiked}) {
	return (
		<ReactionInfoContainer>
			<ReactionInfo imgs={imgs} count={count} type="like" />
			<LikeButton isLiked={isLiked} />
		</ReactionInfoContainer>
	);
}

export default LikeToolbar;
