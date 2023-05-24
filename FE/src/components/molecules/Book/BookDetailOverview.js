import React from "react";
import { BookDetailOverviewBox } from "../../../styles/Book/BookDetailStyle";
import { Span, Text } from "../../../styles/common/TextsStyle";

function BookDetailOverview({ cover, title, author, publisher, genres }) {
	return (
		<BookDetailOverviewBox>
			<img src={cover} alt="cover" />
			<div>
				<Text size="19" weight="bold" marginBottom="8">
					{title}
				</Text>
				<Text marginBottom="16">{author}</Text>
				<Text size="14" color="var(--gray-500)">
					{publisher}
					<Span marginLeft="8" marginRight="8" color="var(--gray-300)">
						|
					</Span>
					{genres?.join(", ")}
				</Text>
			</div>
		</BookDetailOverviewBox>
	);
}

export default BookDetailOverview;
