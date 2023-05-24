import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import ActionsNavigationBar from "../../molecules/Bar/ActionsNavigationBar";
import JoinProgressBar from "../../molecules/Bar/JoinProgressBar";

import { Container } from "../../../styles/common/ContainingsStyle";
import { Text } from "../../../styles/common/TextsStyle";
import JoinBasicForm from "../../organisms/Join/JoinBasicForm";

function JoinBasic() {
	const navigate = useNavigate();
	const allValidRef = useRef();

	const handleClickPre = () => {
		navigate("/login");
	};

	const handleClickNext = () => {
		if (allValidRef.current.allConfirmTest()) {
			navigate("/join/2");
		}
	};

	return (
		<>
			<ActionsNavigationBar
				pre="이전"
				title="회원가입"
				next="다음"
				handleClickPre={handleClickPre}
				handleClickNext={handleClickNext}
			/>
			<Container paddingTop="56" paddingLeft="16" paddingRight="16">
				<JoinProgressBar step="1" />
				<Text size="20" weight="600">
					기본 정보를 입력해주세요
				</Text>
				<div>
					<JoinBasicForm ref={allValidRef} />
				</div>
			</Container>
		</>
	);
}

export default JoinBasic;
