import React from "react";
import { BookListSkeletonItemBox, PreviewBookSkeletonBox } from "../../../styles/Book/BookStyle";

function PreviewBookSkeleton(props) {
	return (
		<PreviewBookSkeletonBox>
			{[1, 2, 3].map((item) => (
				<BookListSkeletonItemBox>
					<div></div>
					<div></div>
					<div></div>
				</BookListSkeletonItemBox>
			))}
		</PreviewBookSkeletonBox>
	);
}

export default PreviewBookSkeleton;
