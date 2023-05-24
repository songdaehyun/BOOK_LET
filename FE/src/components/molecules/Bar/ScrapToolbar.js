import React from "react";

import ScrapButton from "../../atoms/Button/ScrapButton";
import ReactionInfo from "../ReactionInfo";

import { Text } from "../../../styles/common/TextsStyle";
import { ReactionInfoContainer } from "../../../styles/Sentence/PostPreviewStyle";

function ScrapToolbar({ sId, isScraped, scrapImgs, scrapCount, date, isMy }) {
	return (
		<ReactionInfoContainer>
			<ReactionInfo imgs={scrapImgs} count={scrapCount} type="scrap" isMy={isMy} />
			{isMy ? (
				<Text size="14" color="var(--gray-500)">
					{date}
				</Text>
			) : (
				!isMy && <ScrapButton sId={sId} isScraped={isScraped} />
			)}
		</ReactionInfoContainer>
	);
}

export default ScrapToolbar;
