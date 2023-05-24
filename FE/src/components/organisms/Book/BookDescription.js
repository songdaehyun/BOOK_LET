import React from "react";
import { Container } from "../../../styles/common/ContainingsStyle";
import { Text } from "../../../styles/common/TextsStyle";

function BookDescription({ description }) {
	return (
		<Container marginTop="48" marginBottom="48">
			<Text size="19" weight="600" marginBottom="8">
				책 소개
			</Text>
			<Text color="var(--gray-500)" height="28">
				{description}
			</Text>
		</Container>
	);
}

export default BookDescription;
