import React from "react";

import PreviewBookOverview from "./PreviewBookOverview";

import "../../../styles/common/swiperStyle.css";

import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function PreviewSwiperBook({ books }) {
	return (
		<Swiper
			slidesPerView={2.2}
			spaceBetween={16}
			freeMode={true}
			modules={[FreeMode]}
			className="mySwiper"
		>
			{books &&
				books?.map((book, idx) => (
					<SwiperSlide>
						<PreviewBookOverview key={idx} book={book} />
					</SwiperSlide>
				))}
		</Swiper>
	);
}

export default PreviewSwiperBook;
