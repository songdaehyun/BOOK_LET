import React from "react";
import { Container } from "../../../styles/common/ContainingsStyle";
import { Text } from "../../../styles/common/TextsStyle";

import MoreBar from "../../molecules/Bar/MoreBar";

function MyInfoSetSection(props) {
	return (
		<Container marginTop="56" paddingLeft="16" paddingRight="16">
			<Text size="14" weight="600" marginBottom="16" color="var(--gray-500)">회원 정보</Text>
			<MoreBar title="회원 정보 수정" path="info/edit" />
			{/* <MoreBar title="감성 태그 수정" path="tag/edit" /> */}
		</Container>
	);
}

export default MyInfoSetSection;
