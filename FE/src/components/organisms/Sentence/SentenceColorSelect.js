import React from "react";

import SentenceColorRadioButtonGroup from "../../molecules/Sentence/SentenceColorRadioButtonGroup";

import { Span, Text } from "../../../styles/common/TextsStyle";
import { Container } from "../../../styles/common/ContainingsStyle";

function SentenceColorSelect({ setBackground }) {
	return (
		<Container marginBottom="32">
			<Text weight="bold" marginBottom="16">
				배경색
				<Span weight="normal" size="14" color="var(--gray-500)" marginLeft="16">
					배경 색을 선택해주세요
				</Span>
			</Text>
			<SentenceColorRadioButtonGroup setBackground={setBackground} />
		</Container>
	);
}

export default SentenceColorSelect;
