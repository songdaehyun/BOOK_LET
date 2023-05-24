import React from "react";
import { Container } from "../../../styles/common/ContainingsStyle";
import { DeleteMyAccountBox } from "../../../styles/Mypage/MypageStyle";

import Warning from "../../atoms/Image/Warning";
import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import DeleteAccountAction from "../../organisms/Mypage/DeleteAccountAction";
import DeleteAccountGuide from "../../organisms/Mypage/DeleteAccountGuide";

function DeleteMyAccount(props) {
	return (
		<div>
			<ReturnNavigationBar title="회원 탈퇴" />
			<DeleteMyAccountBox>
				<Warning />
				<DeleteAccountGuide />
				<DeleteAccountAction />
			</DeleteMyAccountBox>
		</div>
	);
}

export default DeleteMyAccount;
