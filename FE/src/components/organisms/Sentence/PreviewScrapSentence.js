import React, { useEffect, useState } from "react";

import MoreBar from "../../molecules/Bar/MoreBar";
import PreviewSwiperSentence from "../../molecules/Sentence/PreviewSwiperSentence";

import { Container } from "../../../styles/common/ContainingsStyle";

import { initScrappedList, initSentenceList } from "../../../apis/init/initSentence";
import { getScrappedPost } from "../../../apis/sentenceApi";
import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";

function PreviewScrapSentence(props) {
	const id = localStorage.getItem("userId");
	const [sentences, setSentences] = useState();

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

	useEffect(() => {
		(async () => {
			await getScrappedPost(id, 3, 0)
				.then(initSentenceList)
				.then((res) => setSentences(res?.contents));
		})();
	}, []);

	return (
		<div>
			<Container marginBottom="40">
				<MoreBar title="스크랩한 문장" path="/sentence/scrap" />
				{isArrEmpty(sentences) ? (
					<Empty
						title={emptyInfo.title}
						subTitle={emptyInfo.subTitle}
						buttonLabel={emptyInfo.buttonLabel}
						path={emptyInfo.path}
						top="24"
					/>
				) : (
					<PreviewSwiperSentence sentences={sentences} />
				)}
			</Container>
		</div>
	);
}

export default PreviewScrapSentence;
