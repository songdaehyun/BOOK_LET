import React from "react";
import { useNavigate } from "react-router-dom";

import { BookHeadingBox } from "../../../styles/Book/BookStyle";
import { Text } from "../../../styles/common/TextsStyle";

import SearchIcon from "../../../assets/icons/search-icon.png";

function BookHeading(props) {
    const navigate = useNavigate();
	const handleClickSearch = () => {
		navigate('search')
	}
	return (
		<BookHeadingBox>
			<Text size="24" weight="bold">
				도서
			</Text>
			<img src={SearchIcon} alt="search icon" onClick={handleClickSearch}/>
		</BookHeadingBox>
	);
}

export default BookHeading;
