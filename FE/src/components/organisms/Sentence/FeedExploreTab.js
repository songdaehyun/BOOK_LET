import React, { useEffect, useState } from "react";

import PreviewRecoSentence from "./PreviewRecoSentence";
import PreviewScrapSentence from "./PreviewScrapSentence";

import { Container } from "../../../styles/common/ContainingsStyle";

import PreviewPostWithProfile from "./PreviewPostWithProfile";

import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";
import { getFollowingPost } from "../../../apis/sentenceApi";
import { initSentenceList } from "../../../apis/init/initSentence";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

function FeedExploreTab(props) {
	const isArrEmpty = useArr();

	const id = localStorage.getItem("userId");

	const emptyInfo = {
		title: "팔로우가 올린 문장이 없어요",
		subTitle: (
			<>
				더 많은 분들을 팔로우해서
				<br />
				문장을 공유해보세요!
			</>
		),
		buttonLabel: "추천 문장 보러 가기",
		path: "/sentence/recommand",
	};

	const { data: posts, isFetching } = useInfiniteScroll(
		id,
		getFollowingPost,
		5,
		initSentenceList
	);

	return (
		<Container paddingTop="32">
			<PreviewRecoSentence />
			<PreviewScrapSentence />
			{isArrEmpty(posts) ? (
				<Empty
					title={emptyInfo.title}
					subTitle={emptyInfo.subTitle}
					buttonLabel={emptyInfo.buttonLabel}
					path={emptyInfo.path}
				/>
			) : (
				posts?.map((post, idx) => <PreviewPostWithProfile key={idx} post={post} />)
			)}
		</Container>
	);
}

export default FeedExploreTab;
