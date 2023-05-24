import React from "react";
import { Span, Text } from "../../../styles/common/TextsStyle";
import { FollowLabelBox } from "../../../styles/Mypage/MypageStyle";

function FollowLabel({ label, count }) {
	return (
		<FollowLabelBox>
			<Text size="14" color="var(--primary-600)">
				{label}
				<Span size="14" weight="bold" marginLeft="4">
					{count}
				</Span>
			</Text>
		</FollowLabelBox>
	);
}

export default FollowLabel;
