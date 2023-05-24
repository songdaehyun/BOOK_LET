import React, { useEffect, useState } from "react";

import TopBanner from "../../molecules/Banner/TopBanner";
import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import PreviewPostWithProfile from "../../organisms/Sentence/PreviewPostWithProfile";

import { Container } from "../../../styles/common/ContainingsStyle";

import BannerImg from "../../../assets/images/Banner/reco-sentence-banner.png";
import { initSentenceList } from "../../../apis/init/initSentence";
import { getSentenceRecom } from "../../../apis/sentenceApi";

function RecomSentence(props) {
	const uName = localStorage.getItem("userName");
	const [recom, setRecom] = useState();

	useEffect(() => {
		(async () => {
			await getSentenceRecom(uName)
				.then(initSentenceList)
				.then((res) => {
					setRecom(res?.contents);
				});
		})();
	}, []);

	const bannerInfo = {
		title: "추천 문장",
		subTitle: (
			<>
				올리신 문장과 스크랩한 문장을 기반으로
				<br /> 문장을 추천해드려요.
			</>
		),
		img: BannerImg,
	};

	return (
		<div>
			<ReturnNavigationBar />
			<Container paddingTop="48">
				<TopBanner
					title={bannerInfo.title}
					subTitle={bannerInfo.subTitle}
					img={bannerInfo.img}
				/>
			</Container>
			<Container marginTop="24" marginLeft="16" marginRight="16">
				{recom?.map((post, idx) => (
					<PreviewPostWithProfile key={idx} post={post} />
				))}
			</Container>
		</div>
	);
}

export default RecomSentence;
