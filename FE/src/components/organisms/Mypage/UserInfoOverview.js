import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../../../apis/userApi";

import { Container } from "../../../styles/common/ContainingsStyle";
import { Text } from "../../../styles/common/TextsStyle";
import { FollowLabelsBox } from "../../../styles/Mypage/MypageStyle";
import FollowLabel from "../../atoms/Mypage/FollowLabel";
import UserProfileImage from "../../atoms/UserProfileImage";

function UserInfoOverview(props) {
	const navigate = useNavigate();

	const uName = localStorage.getItem("userName");
	const [user, setUser] = useState();

	const getMyInfoApiCall = () => {
		(async () => {
			await getMyInfo(uName).then((res) => {
				setUser(res);
			});
		})();
	};

	useEffect(() => {
		getMyInfoApiCall();
	}, []);

	const handleClickFollowLabel = () => {
		navigate("follow");
	};

	return (
		<>
			<Container paddingTop="56" paddingBottom="32" paddingLeft="16" paddingRight="16">
				<UserProfileImage img={user?.imgPath} size="lg" />
				<Text weight="bold" marginTop="24" marginBottom="16">
					{user?.nickname}
				</Text>
				<FollowLabelsBox>
					<div onClick={handleClickFollowLabel}>
						<FollowLabel label="팔로잉" count={user?.following} />
					</div>
					<div onClick={handleClickFollowLabel}>
						<FollowLabel label="팔로워" count={user?.follower} />
					</div>
				</FollowLabelsBox>
			</Container>
		</>
	);
}

export default UserInfoOverview;
