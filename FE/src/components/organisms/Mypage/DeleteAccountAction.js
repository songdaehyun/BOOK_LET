import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../../../apis/authApi";
import { DeleteAccountBtn } from "../../../styles/common/ButtonsStyle";
import { Text } from "../../../styles/common/TextsStyle";
import { DeleteAccounBottomBox, DeleteAccountCheckBox } from "../../../styles/Mypage/MypageStyle";
import Check from "../../atoms/Icon/CricleCheck";

function DeleteAccountAction(props) {
	const navigate = useNavigate();

	const [isChecked, setIsChecked] = useState(false);

	const handleClickCheck = () => {
		setIsChecked(!isChecked);
	};

	const handleClickDeleteAccountButton = () => {
		if (isChecked) {
			(async () => {
				await deleteMyAccount().then((res) => {
					if (res.status === 201) {
						// 로그인 토큰 삭제 후
						navigate("/login");
					}
				});
			})();
		}
	};

	return (
		<DeleteAccounBottomBox>
			<DeleteAccountCheckBox isChecked={isChecked}>
				<div onClick={handleClickCheck}>
					<Check />
				</div>
				<Text onClick={handleClickCheck}>
					유의사항을 모두 확인했으며, 이에 동의합니다.{" "}
				</Text>
			</DeleteAccountCheckBox>
			<DeleteAccountBtn onClick={handleClickDeleteAccountButton} isChecked={isChecked}>
				탈퇴하기
			</DeleteAccountBtn>
		</DeleteAccounBottomBox>
	);
}

export default DeleteAccountAction;
