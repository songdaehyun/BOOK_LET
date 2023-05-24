import React from "react";
import { PreviewBookSkeletonBox, PreviewBookSkeletonItemBox } from "../../../styles/Book/BookStyle";

import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function PreviewBookSkeleton(props) {
	return (
		<PreviewBookSkeletonBox>
			<Swiper
				slidesPerView={2.2}
				spaceBetween={16}
				freeMode={true}
				modules={[FreeMode]}
				className="mySwiper"
			>
				{[1, 2, 3].map((item) => (
					<SwiperSlide>
						<PreviewBookSkeletonItemBox>
							<div></div>
							<div></div>
							<div></div>
						</PreviewBookSkeletonItemBox>
					</SwiperSlide>
				))}
			</Swiper>
		</PreviewBookSkeletonBox>
	);
}

export default PreviewBookSkeleton;
