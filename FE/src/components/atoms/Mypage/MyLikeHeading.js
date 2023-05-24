import React from "react";

import { Span, Text } from "../../../styles/common/TextsStyle";

function MyLikeHeading({ count }) {
	return (
		<Text color="var(--gray-500)" marginBottom="24">
			<Span weight="bold" color="var(--primary-600)">
				{count}
			</Span>
			개의 도서에 좋아요를 눌렀어요
		</Text>
	);
}

export default MyLikeHeading;
