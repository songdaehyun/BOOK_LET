import React, { useEffect, useState } from "react";

import { postScrap } from "../../../apis/sentenceApi";

import { ScrapBtn } from "../../../styles/common/ButtonsStyle";

function ScrapButton({ sId, isScraped }) {
	const uId = localStorage.getItem("userId");
	// 스크랩 버튼 클릭 시의 상태 변화를 api call하여 get해오지 않고, 화면 단에서 처리
	const [isButtonScrapped, setIsButtonScrapped] = useState();

	useEffect(() => {
		setIsButtonScrapped(isScraped ? true : false);
	}, [isScraped]);

	const handleClickScrap = () => {
		const data = {
			paragraphId: sId,
			userId: uId,
		};

		// 백 요청
		(async () => {
			await postScrap(data).then((res) => {
				if (res === "scrap") {
					setIsButtonScrapped(true);
				} else if (res === "cancel") {
					setIsButtonScrapped(false);
				}
			});
		})();
	};

	return (
		<ScrapBtn
			onClick={handleClickScrap}
			width="19"
			height="24"
			viewBox="0 0 19 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			isScraped={isButtonScrapped}
		>
			<path d="M16 0H2.66667C1.2 0 0.0133336 1.2 0.0133336 2.66667L0 24L9.33333 20L18.6667 24V2.66667C18.6667 1.2 17.4667 0 16 0Z" />
		</ScrapBtn>
	);
}

export default ScrapButton;
