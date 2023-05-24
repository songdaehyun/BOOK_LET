import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setGender } from "../../../reducer/join";

import ActionsNavigationBar from "../../molecules/Bar/ActionsNavigationBar";
import JoinProgressBar from "../../molecules/Bar/JoinProgressBar";

import { Text, ValidFailText } from "../../../styles/common/TextsStyle";
import {
	GenderContainer,
	GenderImgWrapper,
	JoinCenterContainer,
	JoinFullHeightContainer
} from "../../../styles/User/JoinStyle";

import femaleImg from "../../../assets/images/gender_female_img.svg";
import maleImg from "../../../assets/images/gender_male_img.svg";

function JoinAge(props) {
	const navagate = useNavigate();
	const dispatch = useDispatch();

	// 남성: 1, 여성: 2;
	const { gender } = useSelector((state) => state.join);

	const [isValidConfirmed, setIsValidConfirmed] = useState(true);

	const handleClickGender = (gender) => {
		dispatch(setGender(gender));
	};

	const handleClickPre = () => {
		navagate("/join/1");
	};

	const handleClickNext = () => {
		if (gender === 0) {
			setIsValidConfirmed(false);
		} else {
			setIsValidConfirmed(true);

			navagate("/join/3");
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
			<JoinFullHeightContainer paddingTop="56" paddingLeft="16" paddingRight="16">
				<JoinProgressBar step="2" />
				<Text size="20" weight="600" marginBottom="16">
					성별을 선택해주세요
				</Text>
				<Text size="14" color="var(--gray-500)" marginBottom="4">
					도서와 문장 추천에 사용될거예요.
				</Text>
				{!isValidConfirmed && <ValidFailText>성별을 선택해주세요</ValidFailText>}
				<JoinCenterContainer>
					<GenderContainer>
						<GenderImgWrapper
							onClick={() => handleClickGender(1)}
							isSelected={gender === 1 ? true : false}
						>
							<img src={maleImg} alt="male image" />
						</GenderImgWrapper>
						<Text marginTop="16">남성</Text>
					</GenderContainer>
					<GenderContainer>
						<GenderImgWrapper
							onClick={() => handleClickGender(2)}
							isSelected={gender === 2 ? true : false}
						>
							<img src={femaleImg} alt="female image" />
						</GenderImgWrapper>
						<Text marginTop="16">여성</Text>
					</GenderContainer>
				</JoinCenterContainer>
			</JoinFullHeightContainer>
		</>
	);
}

export default JoinAge;
