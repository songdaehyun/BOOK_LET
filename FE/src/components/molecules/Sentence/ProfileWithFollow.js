import React from "react";
import { UserProfileBox } from "../../../styles/Sentence/DetailSentenceStyle";
import FollowButton from "../../atoms/Button/FollowButton";

import UserProfile from "../UserProfile";

function ProfileWithFollow({ uName, nickname, profileImg, isFollowed, setIsFollowed, isMy }) {
	return (
		<UserProfileBox>
			<UserProfile nickname={nickname} profileImg={profileImg} />
			{!isMy && (
				<FollowButton
					uName={uName}
					nickname={nickname}
					isFollowed={isFollowed}
					setIsFollowed={setIsFollowed}
				/>
			)}
		</UserProfileBox>
	);
}

export default ProfileWithFollow;
