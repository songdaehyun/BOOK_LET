import React from "react";
import { PreviewSwiperSentenceContainer } from "../../../styles/Sentence/PreviewRecoStyle";
import SmallSentence from "../../atoms/Sentence/SmallSentence";

import "../../../styles/common/swiperStyle.css";

import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function PreviewSwiperSentence({ sentences }) {
	return (
		<PreviewSwiperSentenceContainer>
			<Swiper
				slidesPerView={2.2}
				spaceBetween={16}
				freeMode={true}
				modules={[FreeMode]}
				className="mySwiper"
			>
				{sentences?.map((sentence, idx) => (
					<SwiperSlide>
						<SmallSentence sentence={sentence} />
					</SwiperSlide>
				))}
			</Swiper>
		</PreviewSwiperSentenceContainer>
	);
}

export default PreviewSwiperSentence;
