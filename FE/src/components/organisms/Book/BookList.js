import React from "react";
import { BookListBox } from "../../../styles/Book/BookStyle";

import PreviewBookOverview from "../../molecules/Book/PreviewBookOverview";

function BookList({ books }) {
	return (
		<BookListBox>
			{books?.map((book, idx) => (
				<PreviewBookOverview key={idx} book={book} />
			))}
		</BookListBox>
	);
}

export default BookList;
