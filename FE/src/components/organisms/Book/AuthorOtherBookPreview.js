import React from "react";

import MoreBar from "../../molecules/Bar/MoreBar";
import PreviewSwiperBook from "../../molecules/Book/PreviewSwiperBook";

function AuthorOtherBookPreview({ aId, authorOtherBooks }) {
	return (
		<div>
			<MoreBar title="이 저자의 다른 책" path={`/author/${aId}`} />
			<PreviewSwiperBook books={authorOtherBooks} />
		</div>
	);
}

export default AuthorOtherBookPreview;
