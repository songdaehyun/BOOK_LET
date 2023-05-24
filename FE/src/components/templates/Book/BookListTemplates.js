import React, { useEffect } from "react";

import TopBanner from "../../molecules/Banner/TopBanner";
import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import BookList from "../../organisms/Book/BookList";
import MasonryBookList from "../../organisms/Book/MasonryBookList";

import { Container } from "../../../styles/common/ContainingsStyle";

import BookListSkeleton from "../../molecules/Book/BookListSkeleton";
import Empty from "../../molecules/Empty";

function BookListTemplates({ title, subTitle, img, books, type, emptyInfo, loading, error }) {
	return (
		<div>
			<ReturnNavigationBar />
			<Container paddingTop="48">
				<TopBanner title={title} subTitle={subTitle} img={img} />
			</Container>
			{loading && (
				<Container marginTop="24" marginBottom="24" paddingLeft="16" paddingRight="16">
					<BookListSkeleton />
				</Container>
			)}
			{error && (
				<>
					<Empty
						top={36}
						title={emptyInfo?.title}
						subTitle={emptyInfo?.subTitle}
						buttonLabel={emptyInfo?.buttonLabel}
						path={emptyInfo?.path}
					/>
				</>
			)}
			{books &&
				(type !== "bookCover" ? (
					<BookList books={books} />
				) : (
					<MasonryBookList books={books} />
				))}
		</div>
	);
}

export default BookListTemplates;
