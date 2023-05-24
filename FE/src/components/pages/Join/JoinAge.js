import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setAge } from "../../../reducer/join";

import ActionsNavigationBar from "../../molecules/Bar/ActionsNavigationBar";
import JoinProgressBar from "../../molecules/Bar/JoinProgressBar";

import { Text, ValidFailText } from "../../../styles/common/TextsStyle";
import {
	AgeInput,
	JoinCenterContainer,
	JoinFullHeightContainer
} from "../../../styles/User/JoinStyle";

function JoinAge(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { age } = useSelector((state) => state.join);

	const [isAgeValidConfirmed, setIsAgeValidConfirmed] = useState(true);

	const handleChangeAge = (e) => {
		const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
		dispatch(setAge(onlyNumber));
	};

	const ageValidTest = () => {
		if (age === "") {
			setIsAgeValidConfirmed(false);

			return false;
		} else {
			setIsAgeValidConfirmed(true);

			return true;
		}
	};

	const handleClickPre = () => {
		navigate("/join/2");
	};

	const handleClickNext = () => {
		if (ageValidTest()) {
			navigate("/join/4");
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
			<JoinFullHeightContainer>
				<JoinProgressBar step="3" />
				<Text size="20" weight="600" marginBottom="16">
					나이를 입력해주세요
				</Text>
				<Text size="14" color="var(--gray-500)" marginBottom="4">
					도서와 문장 추천에 사용될거예요.
				</Text>
				{!isAgeValidConfirmed && <ValidFailText>나이를 입력해주세요</ValidFailText>}
				<JoinCenterContainer>
					<AgeInput
						placeholder="나이"
						value={age}
						onChange={handleChangeAge}
						size="1"
						maxLength={3}
					/>
				</JoinCenterContainer>
			</JoinFullHeightContainer>
		</>
	);
}

export default JoinAge;
