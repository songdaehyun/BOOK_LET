import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import EmotionTag from "../../../components/atoms/Join/EmotionTag";
import ActionsNavigationBar from "../../molecules/Bar/ActionsNavigationBar";
import JoinProgressBar from "../../molecules/Bar/JoinProgressBar";

import { join } from "../../../apis/authApi";
import { initTag } from "../../../apis/init/initUser";
import { getTagExample, postTaste } from "../../../apis/userApi";
import { Container } from "../../../styles/common/ContainingsStyle";
import { Span, Text } from "../../../styles/common/TextsStyle";
import { TagsContainer } from "../../../styles/User/JoinStyle";

function JoinTag(props) {
	const navagate = useNavigate();

	const { id, nickname, email, pw, age, gender } = useSelector((state) => state.join);
	const { selectedCover } = useSelector((state) => state.user);

	const [tags, setTags] = useState([]);
	const [selectedTag, setSelectedTag] = useState([]);
	const [isTargetValidConfirmed, setIsTargetValidConfirmed] = useState(false);
	const [next, setNext] = useState("");

	useEffect(() => {
		(async () => {
			await getTagExample()
				.then(initTag)
				.then((res) => setTags(res));
		})();
	}, []);

	const handleClickTag = (title) => {
		if (!selectedTag.includes(title)) {
			// 선택되지 않은 태그라면 선택
			setSelectedTag([...selectedTag, title]);
		} else {
			// 선택된 태그라면 해제
			setSelectedTag(selectedTag.filter((tagTitle) => tagTitle !== title));
		}
	};

	const tagValidTest = () => {
		if (5 <= selectedTag.length) {
			setIsTargetValidConfirmed(true);
			setNext("다음");
		} else {
			setIsTargetValidConfirmed(false);
			setNext(`${selectedTag.length} / 5개`);
		}
	};

	const nextColor = () => {
		if (!isTargetValidConfirmed) {
			return `var(--gray-500)`;
		}
	};

	const handleClickPre = () => {
		navagate("/join/4");
	};

	const joinData = {
		username: id,
		nickname: nickname,
		password: pw,
		email: email,
		age: parseInt(age),
		sex: gender,
	};

	const tasteData = {
		tastes: selectedTag,
		bookCovers: selectedCover,
	};

	const postTasteApiCall = (uName, data) => {
		(async () => {
			await postTaste(uName, data).then((res) => {
				if (res === "success") {
					// 회원가입 완료
					navagate("/login");
				}
			});
		})();
	};

	const joinApiCall = (data) => {
		(async () => {
			await join(data).then((res) => {
				if (res === "success") {
					postTasteApiCall(id, tasteData);
				}
			});
		})();
	};

	const handleClickNext = () => {
		if (isTargetValidConfirmed) {
			if (
				id !== "" &&
				nickname !== "" &&
				pw !== "" &&
				email !== "" &&
				age !== "" &&
				gender !== ""
			) {
				joinApiCall(joinData);
			}
		}
	};

	useEffect(() => {
		tagValidTest();
	}, [selectedTag]);

	return (
		<>
			<ActionsNavigationBar
				pre="이전"
				title="회원가입"
				next={next}
				handleClickPre={handleClickPre}
				handleClickNext={handleClickNext}
				nextColor={nextColor()}
			/>
			<Container paddingTop="56" paddingLeft="16" paddingRight="16">
				<JoinProgressBar step="5" />
				<Container marginBottom="24">
					<Text size="20" weight="600" marginBottom="16" height="32">
						당신을 표현할 수 있는
						<br /> 감성 태그를 선택해주세요
					</Text>
					<Text size="14" color="var(--gray-500)" marginBottom="4">
						<Span size="14" weight="bold" color="var(--primary-600)">
							5개&nbsp;
						</Span>
						이상 선택해주세요. 도서와 문장 추천에 사용될거예요.
					</Text>
				</Container>
				<TagsContainer>
					{tags?.map((tag) => (
						<div onClick={() => handleClickTag(tag.title)}>
							<EmotionTag
								onClick={() => handleClickTag(tag.title)}
								id={tag.id}
								title={tag.title}
								isSelected={selectedTag.includes(tag.title) ? true : false}
							/>
						</div>
					))}
				</TagsContainer>
			</Container>
		</>
	);
}

export default JoinTag;
