import React, { useEffect, useState } from "react";
import { initSentenceList } from "../../../apis/init/initSentence";
import { getSentenceRecomPreview } from "../../../apis/sentenceApi";
import { Container } from "../../../styles/common/ContainingsStyle";
import { Text } from "../../../styles/common/TextsStyle";

import MoreBar from "../../molecules/Bar/MoreBar";
import PreviewSwiperSentence from "../../molecules/Sentence/PreviewSwiperSentence";

function PreviewRecoSentence(props) {
	const uName = localStorage.getItem("userName");
	const [sentences, setSentences] = useState();

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
			await getSentenceRecomPreview(uName)
				.then(initSentenceList)
				.then((res) => {
					setSentences(res?.contents);
				});
		})();
	}, []);

	return (
		<Container marginBottom="32">
			<Text size="14" color="var(--gray-500)" marginBottom="8">
				당신과 비슷한 감성의 문장을 추려봤어요.
			</Text>
			<MoreBar title="이런 문장도 좋아하실거예요." path="/sentence/recommand" />
			<PreviewSwiperSentence sentences={sentences} />
		</Container>
	);
}

export default PreviewRecoSentence;
