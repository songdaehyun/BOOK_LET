import React from "react";
import { Text } from "../../../styles/common/TextsStyle";
import { DeleteAccountGuideContentBox } from "../../../styles/Mypage/MypageStyle";
import CheckIcon from "../../atoms/Icon/Check";

function DeleteAccountGuideContent({ text }) {
	return (
		<DeleteAccountGuideContentBox>
            <CheckIcon />
			<Text color="var(--gray-500)">{text}</Text>
		</DeleteAccountGuideContentBox>
	);
}

export default DeleteAccountGuideContent;
