import React from "react";
import { Container } from "../../../styles/common/ContainingsStyle";

import { Span, Text } from "../../../styles/common/TextsStyle";
import SentencePageInput from "../../molecules/Input/SentencePageInput";

function WriteSentencePage({ page, setPage }) {
	return (
		<Container marginBottom="32">
			<Text weight="bold" marginBottom="16">
				페이지
				<Span weight="normal" size="14" color="var(--gray-500)" marginLeft="16">
					문장의 페이지를 입력해주세요{" "}
				</Span>
			</Text>
			<SentencePageInput page={page} setPage={setPage} />
		</Container>
	);
}

export default WriteSentencePage;
