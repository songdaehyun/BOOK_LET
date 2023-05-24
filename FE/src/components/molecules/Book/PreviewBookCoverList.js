import React from "react";
import { useNavigate } from "react-router-dom";
import { PreviewBookCoverMasonryBox } from "../../../styles/Book/BookStyle";
import { BookCoverMoreBox } from "../../../styles/Book/PreviewBookRecomStyle";

import { CoverWrapper } from "../../../styles/User/JoinStyle";

function PreviewBookCoverList({ books }) {
	const navagate = useNavigate();

	const handleClickCover = (isbn) => {
		navagate(`${isbn}`);
	};

	const handleClickMoreCover = () => {
		navagate("recom/cover");
	};

	return (
		<PreviewBookCoverMasonryBox>
			{books.map((book) => {
				return (
					<CoverWrapper key={book?.isbn} bottom="16">
						<img
							src={book?.cover} alt="cover"
							onClick={() => handleClickCover(book?.isbn)}
						/>
					</CoverWrapper>
				);
			})}
			{/* <BookCoverMoreBox onClick={handleClickMoreCover}>전체 보기</BookCoverMoreBox> */}
		</PreviewBookCoverMasonryBox>
	);
}

export default PreviewBookCoverList;
