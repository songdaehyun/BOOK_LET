import React, { useEffect, useState } from "react";
import { getMyLike, getMyPreviewLike } from "../../../apis/userApi";
import { Container } from "../../../styles/common/ContainingsStyle";
import PreviewBookSection from "../Book/PreviewBookSection";

function MyLikePreviewSection(props) {
	const [books, setBooks] = useState();

	const uName = localStorage.getItem("userName");

	useEffect(() => {
		(async () => {
			await getMyPreviewLike(uName).then((res) => {
				setBooks(res);
			});
		})();
	}, []);

	return (
		<Container marginTop="56" paddingLeft="16" paddingRight="16">
			<PreviewBookSection title="좋아하는 도서" path="like" books={books} />
		</Container>
	);
}

export default MyLikePreviewSection;
