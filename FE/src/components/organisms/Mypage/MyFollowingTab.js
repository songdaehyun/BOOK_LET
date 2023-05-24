import React from "react";

import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";

import MyFollowList from "./MyFollowList";

function MyFollowingTab(users) {
	const isArrEmpty = useArr();

	const emptyInfo = {
		title: "팔로잉한 유저가 없어요",
		subTitle: (
			<>
				팔로잉을 하면 여러 사용자들의
				<br />
				문장을 볼 수 있어요!
			</>
		),
		buttonLabel: "추천 문장 보러 가기",
		path: "/sentence/recommand",
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
				<MyFollowList users={users} type="following" />
			)}
		</div>
	);
}

export default MyFollowingTab;
