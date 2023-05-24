import React from "react";
import useArr from "../../../hooks/useArr";
import { Container } from "../../../styles/common/ContainingsStyle";

import MoreBar from "../../molecules/Bar/MoreBar";
import MoreBarSkeleton from "../../molecules/Bar/MoreBarSkeleton";
import PreviewBookCoverList from "../../molecules/Book/PreviewBookCoverList";
import PreviewBookSkeleton from "../../molecules/Book/PreviewBookSkeleton";
import PreviewSwiperBook from "../../molecules/Book/PreviewSwiperBook";
import Empty from "../../molecules/Empty";

function PreviewBookSection({ title, type, errTitle, books, path, emptyInfo, loading, error }) {
	return (
		<Container marginTop="40" marginBottom="48">
			{loading && (
				<>
					<MoreBarSkeleton />
					<PreviewBookSkeleton />
				</>
			)}
			{error && (
				<>
					<MoreBar title={errTitle ? errTitle : title} path={path} />
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
					<>
						<MoreBar title={title} path={path} />
						<PreviewSwiperBook books={books} emptyInfo={emptyInfo} />
					</>
				) : (
					<>
						<MoreBar title={title} path={path} />
						<PreviewBookCoverList books={books}></PreviewBookCoverList>
					</>
				))}
		</Container>
	);
}

export default PreviewBookSection;
