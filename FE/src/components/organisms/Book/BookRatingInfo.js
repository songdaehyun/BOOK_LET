import React from "react";
import { RatingBox } from "../../../styles/Book/BookDetailStyle";
import { Span, Text } from "../../../styles/common/TextsStyle";
import RatingStar from "../../atoms/Icon/RatingStar";

function BookRatingInfo({ rating }) {
	return (
		<div>
			<Text color="var(--gray-400)" size="14" marginBottom="8">
				해당 도서의 알라딘 평점이 반영되었습니다
			</Text>
			<Text marginBottom="8">
				평균 평점
				<Span weight="bold" marginLeft="8">
					{rating}
				</Span>
			</Text>
			<RatingBox gap="4">
				{[1, 2, 3, 4, 5].map((num, idx) => (
					<div>
						<RatingStar
							key={idx}
							isSelected={num <= rating ? true : false}
							height="20"
						/>
					</div>
				))}
			</RatingBox>
		</div>
	);
}

export default BookRatingInfo;
