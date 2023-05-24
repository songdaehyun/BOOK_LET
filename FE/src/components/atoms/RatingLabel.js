import React from "react";
import { RatingBox } from "../../styles/Book/BookDetailStyle";
import { RatingLabelBox } from "../../styles/common/CommonStyle";
import { Span } from "../../styles/common/TextsStyle";
import RatingStar from "./Icon/RatingStar";

function RatingLabel({ rating }) {
	return (
		<RatingLabelBox>
			<RatingBox gap="2">
				{[1, 2, 3, 4, 5].map((num, idx) => (
					<RatingStar key={idx} isSelected={num <= rating ? true : false} height="8" />
				))}
			</RatingBox>
			<Span size="12" weight="bold" color="var(--yellow)">
				{rating}
			</Span>
		</RatingLabelBox>
	);
}

export default RatingLabel;
