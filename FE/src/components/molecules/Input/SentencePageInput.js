import React from "react";

import { Span } from "../../../styles/common/TextsStyle";
import { SentencePageInputBox } from "../../../styles/Sentence/SentenceFormStyle";

function SentencePageInput({ page, setPage }) {
	const handleChange = (e) => {
		const onlyNumber = e.target.value.replace(/[^0-9]/g, "");

		if (onlyNumber === "") {
			setPage(onlyNumber);
		} else {
			setPage(parseInt(onlyNumber));
		}
	};

	return (
		<SentencePageInputBox>
			<Span weight="bold" marginRight="8">
				P.
			</Span>
			<input
				value={page}
				onChange={handleChange}
				placeholder="페이지 숫자를 입력해주세요. 예) 24"
			/>
		</SentencePageInputBox>
	);
}

export default SentencePageInput;
