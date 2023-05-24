import React from "react";
import { useSelector } from "react-redux";
import useRating from "../../../hooks/useRating";

import { RatingBox } from "../../../styles/Book/BookDetailStyle";
import RatingStar from "../../atoms/Icon/RatingStar";

function RatingSelect({ height, gap }) {
	const { isSelected } = useSelector((state) => state.book);
	const selectRating = useRating();

	const handleClickRating = (rating) => {
		selectRating(rating);
	};

	return (
		<RatingBox gap={gap ? gap : "8"}>
			{[1, 2, 3, 4, 5].map((rating, idx) => (
				<div onClick={() => handleClickRating(rating)}>
					<RatingStar
						key={idx}
						isSelected={isSelected[idx]}
						height={height ? height : "32"}
						type="button"
					/>
				</div>
			))}
		</RatingBox>
	);
}

export default RatingSelect;
