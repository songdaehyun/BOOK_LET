import React, { useState } from "react";
import { Container } from "../../../styles/common/ContainingsStyle";
import ProfileWithFollow from "../../molecules/Sentence/ProfileWithFollow";
import UserProfile from "../../molecules/UserProfile";

function MyFollowList({ users, type }) {
	const [isFollowed, setIsFollowed] = useState(true);

	return (
		<Container marginTop="24">
			{users?.users?.map((user, idx) =>
				type === "following" ? (
					<ProfileWithFollow
						key={idx}
						uId={user.username}
						nickname={user.nickname}
						profileImg={user.userImg}
						isFollowed={isFollowed}
						setIsFollowed={setIsFollowed}
					/>
				) : (
					<UserProfile key={idx} nickname={user.nickname} profileImg={user.userImg} />
				)
			)}
		</Container>
	);
}

export default MyFollowList;
