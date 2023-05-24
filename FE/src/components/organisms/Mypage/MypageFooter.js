import React from "react";
import { Span, Text } from "../../../styles/common/TextsStyle";

import aladinLogo from "../../../assets/images/aladin-logo-row.png";
import { MypageFooterBox } from "../../../styles/Mypage/MypageStyle";

function MypageFooter(props) {
	return (
		<MypageFooterBox>
			<Text size="12" color="var(--gray-500)">
				데이터 출처
				<Span color="var(--gray-300)" marginLeft="4" marginRight="4">
					|
				</Span>
			</Text>
			<img src={aladinLogo} alt="알라딘 로고" />
		</MypageFooterBox>
	);
}

export default MypageFooter;
