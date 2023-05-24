import React from "react";

import { TabItem, TabWrapper } from "../../../styles/Sentence/FeedTabStyle";

function FeedTab({ selectedItem, setSelectedItem }) {
	const handleClickItem = (item) => {
		setSelectedItem(item);
	};

	return (
		<TabWrapper>
			<TabItem
				onClick={() => handleClickItem(1)}
				isSelected={selectedItem === 1 ? true : false}
			>
				내 문장
			</TabItem>
			<TabItem
				onClick={() => handleClickItem(2)}
				isSelected={selectedItem === 2 ? true : false}
			>
				탐색 문장
			</TabItem>
		</TabWrapper>
	);
}

export default FeedTab;
