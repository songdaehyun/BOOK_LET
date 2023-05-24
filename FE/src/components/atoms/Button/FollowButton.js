import React from "react";
import { postFollow } from "../../../apis/userApi";
import { FollowBtn } from "../../../styles/common/ButtonsStyle";

function FollowButton({ uName, nickname, isFollowed, setIsFollowed }) {
	const myUName = localStorage.getItem("userName");

	const handleClickFollow = () => {
		const data = {
			username: myUName,
			followingUsername: uName,
		};

		(async () => {
			await postFollow(data).then((res) => {
				if (res === "success") {
					setIsFollowed(!isFollowed);
				}
			});
		})();
	};

	return (
		<FollowBtn onClick={handleClickFollow} isFollowed={isFollowed}>
			{isFollowed ? <>언팔로우</> : <>팔로우</>}
		</FollowBtn>
	);
}

export default FollowButton;
