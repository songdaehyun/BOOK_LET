import React from "react";
import { InputRatingSectionBox } from "../../../styles/Book/BookDetailStyle";
import { Text } from "../../../styles/common/TextsStyle";
import RatingText from "../../atoms/RatingText";
import RatingSelect from "./RatingSelect";

function InputRatingSection(props) {
	return (
		<InputRatingSectionBox>
			<Text size="14" color="var(--gray-500)" marginBottom="8">
				이 책이 어떠셨나요?
			</Text>
			<RatingSelect/>
			<RatingText />
		</InputRatingSectionBox>
	);
}

export default InputRatingSection;
