import React from "react";
import { Text } from "../../styles/common/TextsStyle";

function WordCountText({ limit, length }) {
	return (
		<Text size="14" marginTop="8" color="var(--gray-500)">
			{length} / {limit}자
		</Text>
	);
}

export default WordCountText;
