import React from "react";
import { Span, Text } from "../../../styles/common/TextsStyle";
import { TagWrapper } from "../../../styles/User/JoinStyle";

function EmotionTag({ id, title, isSelected }) {
	return (
		<TagWrapper isSelected={isSelected}>
			<Span color={isSelected ? "white" : "var(--primary-600)"} weight="bold">
				#
			</Span>
			<Text color={isSelected && "white"} marginLeft="4">
				{title}
			</Text>
		</TagWrapper>
	);
}

export default EmotionTag;
