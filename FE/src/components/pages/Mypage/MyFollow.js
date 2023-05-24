import React, { useEffect, useState } from "react";

import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import FollowTab from "../../molecules/Tab/FollowTab";

import { Container } from "../../../styles/common/ContainingsStyle";
import MyFollowingTab from "../../organisms/Mypage/MyFollowingTab";
import MyFollowerTab from "../../organisms/Mypage/MyFollowerTab";
import { getFollow } from "../../../apis/userApi";

function MyFollow(props) {
	const uName = localStorage.getItem("userName");
	const [selectedItem, setSelectedItem] = useState(1);
	const [followings, setFollowings] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [followingCnt, setFollowingCnt] = useState(0);
	const [followerCnt, setFollowerCnt] = useState(0);

	useEffect(() => {
		(async () => {
			await getFollow(uName).then((res) => {
				setFollowings(res?.followings);
				setFollowers(res?.followers);
				setFollowingCnt(res?.followingsCnt);
				setFollowerCnt(res?.followersCnt);
			});
		})();
	}, []);

	return (
		<div>
			<ReturnNavigationBar title={selectedItem === 1 ? "팔로잉 목록" : "팔로워 목록"} />
			<Container paddingTop="75" paddingLeft="16" paddingRight="16">
				<FollowTab
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					followingCnt={followingCnt}
					followerCnt={followerCnt}
				/>
				{selectedItem === 1 ? (
					<MyFollowingTab users={followings} />
				) : (
					<MyFollowerTab users={followers} />
				)}
			</Container>
		</div>
	);
}

export default MyFollow;
