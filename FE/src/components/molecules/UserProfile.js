import React from "react";

import { Span } from "../../styles/common/TextsStyle";
import { ProfileContainer } from "../../styles/Sentence/PostPreviewStyle";
import UserProfileImage from "../atoms/UserProfileImage";

function UserProfile({ nickname, profileImg }) {
	return (
		<ProfileContainer>
			<UserProfileImage img={profileImg} size="sm" />
			<Span weight="600" marginLeft="16">
				{nickname}
			</Span>
		</ProfileContainer>
	);
}

export default UserProfile;
