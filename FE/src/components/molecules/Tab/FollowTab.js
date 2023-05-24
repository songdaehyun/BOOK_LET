import React from "react";

import { TabItem, TabWrapper } from "../../../styles/Sentence/FeedTabStyle";

function FollowTab({ selectedItem, setSelectedItem, followingCnt, followerCnt }) {
	const handleClickItem = (item) => {
		setSelectedItem(item);
	};

	return (
		<TabWrapper>
			<TabItem
				onClick={() => handleClickItem(1)}
				isSelected={selectedItem === 1 ? true : false}
			>
				팔로잉 {followingCnt}
			</TabItem>
			<TabItem
				onClick={() => handleClickItem(2)}
				isSelected={selectedItem === 2 ? true : false}
			>
				팔로워 {followerCnt}
			</TabItem>
		</TabWrapper>
	);
}

export default FollowTab;
