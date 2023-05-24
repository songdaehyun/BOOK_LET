import React from "react";
import { useNavigate } from "react-router-dom";
import { TabBarBox, TabBarItemBox } from "../../../styles/common/BarsStyle";

import { Text } from "../../../styles/common/TextsStyle";
import BookIcon from "../../atoms/Icon/TabBar/TabbarBook";
import FeedIcon from "../../atoms/Icon/TabBar/TabbarFeed";
import MyIcon from "../../atoms/Icon/TabBar/TabbarMy";

function TabBar({ selected }) {
	const navigate = useNavigate();

	const feedItems = [
		{
			icon: <FeedIcon />,
			label: "피드",
			path: "/",
		},
		{
			icon: <BookIcon />,
			label: "도서",
			path: "/book",
		},
		{
			icon: <MyIcon />,
			label: "My",
			path: "/mypage",
		},
	];

	const handleClickItem = (path) => {
		navigate(path);
	};

	return (
		<TabBarBox>
			{feedItems.map((feedItem, idx) => (
				<TabBarItemBox key={idx} isSelected={selected === idx + 1 ? true : false}>
					<div onClick={() => handleClickItem(feedItem.path)}>{feedItem.icon}</div>
					<Text
						size="12"
						color={selected === idx + 1 ? true : false}
						onClick={() => handleClickItem(feedItem.path)}
					>
						{feedItem.label}
					</Text>
				</TabBarItemBox>
			))}
			{/* <div>
				<FeedIcon />
				<Text size="12">피드</Text>
			</div>
			<div>
				<BookIcon />
				<Text size="12">도서</Text>
			</div>
			<div>
				<MyIcon />
				<Text size="12">My</Text>
			</div> */}
		</TabBarBox>
	);
}

export default TabBar;
