import React from "react";
import { Text } from "../../../styles/common/TextsStyle";
import DeleteAccountGuideContent from "../../molecules/Mypage/DeleteAccountGuideContent";

function DeleteAccountGuide(props) {
	const guideText = ["ID가 삭제됩니다.", "회원님의 활동 이력, 개인 정보와 설정이 삭제됩니다. "];
	return (
		<div>
			<Text weight="bold" marginBottom="32">회원탈퇴 시 유의사항을 확인해주세요</Text>
			{guideText.map((text, idx) => (
				<DeleteAccountGuideContent key={idx} text={text} />
			))}
		</div>
	);
}

export default DeleteAccountGuide;
