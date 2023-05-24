import React from "react";

import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";

import MyFollowList from "./MyFollowList";

function MyFollowerTab(users) {
	const isArrEmpty = useArr();

	const emptyInfo = {
		title: "나를 팔로워한 유저가 없어요",
	};

	return (
		<div>
			{isArrEmpty(users?.users) ? (
				<Empty
					title={emptyInfo.title}
					subTitle={emptyInfo.subTitle}
					buttonLabel={emptyInfo.buttonLabel}
					path={emptyInfo.path}
				/>
			) : (
				<MyFollowList users={users} type="follower" />
			)}
		</div>
	);
}

export default MyFollowerTab;
