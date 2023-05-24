import React from "react";

import WordCountText from "../../atoms/WordCountText";

import { SentenceTextareaBox, WordCountTextBox } from "../../../styles/Sentence/SentenceFormStyle";
import { Container } from "../../../styles/common/ContainingsStyle";

function SentenceTextarea({ content, setContent, background }) {
	const handleChangeContent = (e) => {
		setContent(e.target.value);
	};

	return (
		<Container marginBottom="16">
			<SentenceTextareaBox color={background}>
				<textarea
					value={content}
					onChange={handleChangeContent}
					placeholder="마음에 드는 책 속 문장을 작성해주세요"
				></textarea>
			</SentenceTextareaBox>
			<WordCountTextBox>
				<WordCountText length={content.length} limit={300} />
			</WordCountTextBox>
		</Container>
	);
}

export default SentenceTextarea;
