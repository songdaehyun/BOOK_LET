import React, { useState } from "react";
import FeedExplore from "../../organisms/Sentence/FeedExploreTab";
import FeedMyTab from "../../organisms/Sentence/FeedMyTab";

import FeedTab from "../../molecules/Tab/FeedTab";

import { useNavigate } from "react-router-dom";
import { TextBtn } from "../../../styles/common/ButtonsStyle";
import { Container, OverflowHiddenBox } from "../../../styles/common/ContainingsStyle";
import { Text } from "../../../styles/common/TextsStyle";
import { FeedHeadingBox } from "../../../styles/Sentence/FeedTabStyle";
import TabBar from "../../molecules/Bar/TabBar";

function Feed(props) {
	const navigate = useNavigate();

	const [selectedItem, setSelectedItem] = useState(1);

	const handleClickWrite = () => {
		navigate("/sentence/write");
	};

	return (
		<>
			<OverflowHiddenBox paddingTop="24" paddingLeft="16" paddingRight="16" paddingBottom="51">
				<Text size="24" weight="bold" marginBottom="24">
					Feed
				</Text>
				<FeedHeadingBox>
					<FeedTab selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
					<TextBtn onClick={handleClickWrite}>문장 쓰기</TextBtn>
				</FeedHeadingBox>
				{selectedItem === 1 ? <FeedMyTab /> : <FeedExplore />}
			</OverflowHiddenBox>
			<TabBar selected={1} />
		</>
	);
}

export default Feed;
