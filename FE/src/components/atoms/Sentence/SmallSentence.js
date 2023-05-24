import React from "react";
import { useNavigate } from "react-router-dom";
import { Span, Text } from "../../../styles/common/TextsStyle";
import {
	SmallSentenceContainer,
	SmallSentenceContent,
} from "../../../styles/Sentence/SmallSentenceStyle";

function SmallSentence({ sentence }) {
	const navigate = useNavigate();

	const handleClickSentence = () => {
		navigate(`/sentence/${sentence?.sId}`);
	};

	return (
		<SmallSentenceContainer onClick={handleClickSentence} color={sentence?.color}>
			<SmallSentenceContent>
				<div>
					{sentence?.content?.split("\n").map((line) => {
						return (
							<Span font="jeju" size="14" height="26">
								{line}
								<br />
							</Span>
						);
					})}
				</div>
			</SmallSentenceContent>
		</SmallSentenceContainer>
	);
}

export default SmallSentence;
