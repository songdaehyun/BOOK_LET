import React from "react";
import { useNavigate } from "react-router-dom";

import {
	DetailSentenceBottomInfo,
	DetailSentenceBottomInfoContainer,
	DetailSentenceContainer,
	SentenceContentBox,
} from "../../../styles/Sentence/DetailSentenceStyle";
import { Span, Text } from "../../../styles/common/TextsStyle";

function DetailSentence({ isbn, title, author, cover, content, page, color }) {
	const navigate = useNavigate();

	const MoveToBook = () => {
		navigate(`/book/${isbn}`);
	};

	return (
		<DetailSentenceContainer color={color}>
			<SentenceContentBox>
				<div>
					{content?.split("\n").map((line) => {
						return (
							<Span font="jeju" height="28">
								{line}
								<br />
							</Span>
						);
					})}
				</div>
			</SentenceContentBox>
			<DetailSentenceBottomInfo color={color}>
				<hr />
				<DetailSentenceBottomInfoContainer>
					<div>
						<img onClick={MoveToBook} src={cover} alt="book cover" />
						<div>
							<Text marginBottom="8" onClick={MoveToBook}>
								<Span font="jeju" size="14">
									『{" "}
								</Span>
								<Span weight="600" size="14">
									{title}
								</Span>
								<Span font="jeju" size="14">
									{" "}
									』
								</Span>
							</Text>
							<Text size="14">{author}</Text>
						</div>
					</div>
					<Text size="14">P. {page}</Text>
				</DetailSentenceBottomInfoContainer>
			</DetailSentenceBottomInfo>
		</DetailSentenceContainer>
	);
}

export default DetailSentence;
