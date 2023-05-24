import React from "react";

import { MyReviewPreveiwCardGroupBox } from "../../../styles/Mypage/MypageStyle";
import MyReviewPreviewCard from "./MyReviewPreviewCard";

import "../../../styles/common/swiperStyle.css";

import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function MyReviewPreveiwCardGroup({ reviews }) {
	return (
		<MyReviewPreveiwCardGroupBox>
			<Swiper
				slidesPerView={1.5}
				spaceBetween={16}
				freeMode={true}
				modules={[FreeMode]}
				className="mySwiper"
			>
				{reviews?.map((review, idx) => (
					<SwiperSlide>
						<MyReviewPreviewCard key={idx} review={review} />
					</SwiperSlide>
				))}
			</Swiper>
		</MyReviewPreveiwCardGroupBox>
	);
}

export default MyReviewPreveiwCardGroup;
