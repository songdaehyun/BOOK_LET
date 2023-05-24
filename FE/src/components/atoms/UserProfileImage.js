import React from "react";

import { UserImageBox } from "../../styles/common/CommonStyle";

import defaultImg from "../../assets/images/user-default-img.png";

function UserProfileImage({ img, size }) {
	return (
		<UserImageBox size={size} isDefault={img ? false : true}>
			<img src={img ? img : defaultImg} alt="user profile" />
		</UserImageBox>
	);
}

export default UserProfileImage;
