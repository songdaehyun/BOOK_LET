import React from "react";

import ScrapToolbar from "../../molecules/Bar/ScrapToolbar";
import PreviewComment from "../../molecules/Sentence/PreviewComment";
import PreviewSentence from "../../molecules/Sentence/PreviewSentence";

import { Container } from "../../../styles/common/ContainingsStyle";

function PreviewPost({ post, isMy }) {
	return (
		<Container marginBottom="40">
			<PreviewSentence post={post} />
			<ScrapToolbar
				sId={post?.sId}
				isScraped={post?.isScraped}
				scrapImgs={post?.scrapImgs}
				scrapCount={post?.scrapCount}
				isMy={isMy}
			/>
			<PreviewComment post={post} isMy={isMy} />
		</Container>
	);
}

export default PreviewPost;
