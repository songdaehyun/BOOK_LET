import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postLike } from "../../../apis/BookApi";
import { LikeBtn } from "../../../styles/common/ButtonsStyle";

function LikeButton({ isLiked }) {
	const { bId } = useParams();
	const uId = localStorage.getItem("userId");
	const [isButtonLiked, setIsButtonLiked] = useState();

	useEffect(() => {
		setIsButtonLiked(isLiked);
	}, [isLiked]);

	const handleClickLike = () => {
		const data = {
			bookIsbn: bId,
			userId: uId,
		};

		(async () => {
			await postLike(data).then((res) => {
				if (res === "like") {
					setIsButtonLiked(true);
				} else if (res === "cancel") {
					setIsButtonLiked(false);
				}
			});
		})();
	};

	return (
		<LikeBtn
			onClick={handleClickLike}
			width="19"
			height="24"
			viewBox="0 0 19 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			isLiked={isButtonLiked}
		>
			<path d="M4.70565 0C2.1068 0 0 2.08519 0 4.65741C0 6.73396 0.82317 11.6621 8.92898 16.6447C9.22252 16.8251 9.6001 16.8251 9.89364 16.6447C17.9994 11.6621 18.8226 6.73396 18.8226 4.65741C18.8226 2.08519 16.7158 0 14.117 0C11.5181 0 9.41131 2.82267 9.41131 2.82267C9.41131 2.82267 7.30451 0 4.70565 0Z" />
		</LikeBtn>
	);
}

export default LikeButton;