import React, { useEffect, useState } from "react";

import ScrapHeading from "../../atoms/Sentence/ScrapHeading";
import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import UserProfile from "../../molecules/UserProfile";
import PreviewPost from "../../organisms/Sentence/PreviewPost";

import { Container } from "../../../styles/common/ContainingsStyle";

import { initScrappedList, initSentenceList } from "../../../apis/init/initSentence";
import { getScrappedPost } from "../../../apis/sentenceApi";
import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

function ScrapSentence(props) {
	const id = localStorage.getItem("userId");

	const isArrEmpty = useArr();

	const emptyInfo = {
		title: "스크랩한 문장이 없어요",
		subTitle: (
			<>
				다른 분들의 문장을 스크랩해서
				<br />
				수집해보세요!
			</>
		),
		buttonLabel: "추천 문장 보러 가기",
		path: "/sentence/recommand",
	};

	const { data: posts, isFetching } = useInfiniteScroll(id, getScrappedPost, 5, initSentenceList);

	return (
		<>
			<ReturnNavigationBar title="스크랩한 문장" />
			<Container paddingTop="56" paddingLeft="16" paddingRight="16">
				<ScrapHeading />
				{isArrEmpty(posts) ? (
					<Empty
						title={emptyInfo.title}
						subTitle={emptyInfo.subTitle}
						buttonLabel={emptyInfo.buttonLabel}
						path={emptyInfo.path}
					/>
				) : (
					posts?.map((post) => (
						<>
							<UserProfile
								file
								nickname={post?.nickname}
								profileImg={post?.profileImg}
							/>
							<PreviewPost key={post?.id} post={post} isMy={false} />
						</>
					))
				)}
			</Container>
		</>
	);
}

export default ScrapSentence;
