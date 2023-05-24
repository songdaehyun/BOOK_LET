import React, { useEffect, useState } from "react";
import { getScrapCount } from "../../../apis/sentenceApi";

import { Span, Text } from "../../../styles/common/TextsStyle";

function ScrapHeading({ posts }) {
	const id = localStorage.getItem("userId");
	const [count, setCount] = useState(0);

	useEffect(() => {
		(async () => {
			await getScrapCount(id).then((res) => {
				setCount(res);
			});
		})();
	}, []);

	return (
		<Text color="var(--gray-500)" marginBottom="24">
			<Span weight="bold" color="var(--primary-600)">
				{count}
			</Span>
			개의 문장을 스크랩했어요
		</Text>
	);
}

export default ScrapHeading;
