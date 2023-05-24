import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ScrapToolbar from "../../molecules/Bar/ScrapToolbar";
import DetailSentence from "../../molecules/Sentence/DetailSentence";
import ProfileWithFollow from "../../molecules/Sentence/ProfileWithFollow";

import useDate from "../../../hooks/useDate";

import { deletePost } from "../../../apis/sentenceApi";
import { Container } from "../../../styles/common/ContainingsStyle";
import { Span, Text } from "../../../styles/common/TextsStyle";
import { DetailPostDateBox } from "../../../styles/Sentence/DetailSentenceStyle";
import ModalLayer from "../ModalLayer";

function DetailPostOverview({
	uId,
	nickname,
	uName,
	profileImg,
	date,
	isScraped,
	scrapImgs,
	scrapCount,
	isFollowed,
	setIsFollowed,
	isbn,
	title,
	author,
	cover,
	sId,
	content,
	page,
	color,
}) {
	const navigate = useNavigate();
	const dateTimeSeparation = useDate();
	const isMy = parseInt(localStorage.getItem("userId")) === uId;

	const [isOpen, setIsOpen] = useState(false);
	const openPopup = () => {
		setIsOpen(true);
	};

	const handleClickDelete = () => {
		setIsOpen(false);

		(async () => {
			await deletePost(sId).then((res) => {
				if (res === "success") {
					navigate("/");
				}
			});
		})();
	};

	return (
		<>
			<DetailSentence
				author={author}
				cover={cover}
				isbn={isbn}
				title={title}
				color={color}
				content={content}
				page={page}
			/>
			<Container marginTop="16" paddingLeft="16" paddingRight="16">
				<ScrapToolbar
					sId={sId}
					nickname={nickname}
					isScraped={isScraped}
					scrapImgs={scrapImgs}
					scrapCount={scrapCount}
					isMy={isMy}
				/>
				<Container marginTop="24">
					<ProfileWithFollow
						uName={uName}
						nickname={nickname}
						profileImg={profileImg}
						isFollowed={isFollowed}
						setIsFollowed={setIsFollowed}
						isMy={isMy}
					/>
				</Container>
				<DetailPostDateBox>
					<Text size="14" color="var(--gray-500)">
						{isMy && (
							<>
								<Span onClick={openPopup}>삭제</Span>{" "}
								<Span marginLeft="8" marginRight="8" color="var(--gray-300)">
									|
								</Span>
							</>
						)}
						{dateTimeSeparation(date)}
					</Text>
				</DetailPostDateBox>
			</Container>
			<ModalLayer
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="삭제하시겠습니까?"
				leftLabel="취소"
				rightLabel="삭제"
				action={handleClickDelete}
			/>
		</>
	);
}

export default DetailPostOverview;
