import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../styles/common/ContainingsStyle";
import { Text } from "../../../styles/common/TextsStyle";

import MoreBar from "../../molecules/Bar/MoreBar";

function MyAccountSetSection(props) {
	const navigate = useNavigate();

	const handleClickLogout = () => {
		// 로컬 스토리지 초기화
		localStorage.clear();
		navigate("/login");
	};

	return (
		<Container marginTop="56" paddingLeft="16" paddingRight="16">
			<Text size="14" weight="600" marginBottom="16" color="var(--gray-500)">
				계정 관리
			</Text>
			<div onClick={handleClickLogout}>
				<MoreBar title="로그아웃" />
			</div>
			{/* <MoreBar title="탈퇴" path="delete-account" /> */}
		</Container>
	);
}

export default MyAccountSetSection;
