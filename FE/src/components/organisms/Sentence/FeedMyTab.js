import React from "react";

import PreviewPost from "./PreviewPost";

import { Container } from "../../../styles/common/ContainingsStyle";

import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";

import { initSentenceList } from "../../../apis/init/initSentence";
import { getMyPost } from "../../../apis/sentenceApi";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

function FeedMyTab(props) {
	const id = localStorage.getItem("userId");

	const isArrEmpty = useArr();

	const emptyInfo = {
		title: "올리신 문장이 없어요",
		subTitle: (
			<>
				좋은 문장을 올려서 수집하고, <br />
				다른 분들과 공유해보세요!
			</>
		),
		buttonLabel: "문장 쓰러 가기",
		path: "/sentence/write",
	};

	const { data: posts, isFetching } = useInfiniteScroll(id, getMyPost, 5, initSentenceList);

	return (
		<Container paddingTop="32">
			{isFetching && <div>로딩 중</div>}
			{isArrEmpty(posts) ? (
				<Empty
					title={emptyInfo.title}
					subTitle={emptyInfo.subTitle}
					buttonLabel={emptyInfo.buttonLabel}
					path={emptyInfo.path}
				/>
			) : (
				posts?.map((post) => <PreviewPost key={post.id} post={post} isMy={true} />)
			)}
		</Container>
	);
}

export default FeedMyTab;
