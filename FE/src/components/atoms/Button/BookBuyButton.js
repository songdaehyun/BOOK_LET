import React from "react";

import { BookBuyBtn } from "../../../styles/common/ButtonsStyle";
import { Text } from "../../../styles/common/TextsStyle";

import aladinLogo from "../../../assets/images/aladin-logo.png";

function BookBuyButton({ isbn }) {
	const handleClick = () => {
		window.open(`https://www.aladin.co.kr/shop/wproduct.aspx?isbn=${isbn}`);
	};

	return (
		<BookBuyBtn onClick={handleClick}>
			<img src={aladinLogo} alt="aladin-logo" />
			<Text size="14">이 책 구매하러 가기</Text>
		</BookBuyBtn>
	);
}

export default BookBuyButton;
