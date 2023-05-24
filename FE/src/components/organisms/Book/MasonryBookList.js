import React from "react";
import { useNavigate } from "react-router-dom";

import {
	ListBookCoverMasonryBox,
	PreviewBookMasonryOverviewBox,
} from "../../../styles/Book/BookStyle";
import { Text } from "../../../styles/common/TextsStyle";

function MasonryBookList({ books }) {
	const navigate = useNavigate();

	const handleClick = (isbn) => {
		navigate(`/book/${isbn}`);
	};

	return (
		<ListBookCoverMasonryBox>
			{books.map((book) => {
				return (
					<PreviewBookMasonryOverviewBox key={book?.isbn}>
						<img
							src={book?.bookImgPath || book?.cover}
							alt="book"
							onClick={() => handleClick(book?.isbn)}
						/>
						<Text weight="600" marginBottom="4" onClick={() => handleClick(book?.isbn)}>
							{book?.title}
						</Text>
						<Text size="14" color="var(--gray-500)">
							{book?.author}
						</Text>
					</PreviewBookMasonryOverviewBox>
				);
			})}
		</ListBookCoverMasonryBox>
	);
}

export default MasonryBookList;
