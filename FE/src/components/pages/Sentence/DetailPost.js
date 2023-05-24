import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { initComment, initSentence } from "../../../apis/init/initSentence";
import { getComment, getPost } from "../../../apis/sentenceApi";

import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import DetailComment from "../../organisms/Sentence/DetailComment";
import DetailPostOverview from "../../organisms/Sentence/DetailPostOverview";

import { SeparationBar } from "../../../styles/common/BarsStyle";
import TabBar from "../../molecules/Bar/TabBar";

function DetailPost() {
	const uId = localStorage.getItem("userId");
	const { sId } = useParams();

	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);

	const [isFollowed, setIsFollowed] = useState(false);

	const getPostApiCall = () => {
		(async () => {
			await getPost(sId, uId)
				.then(initSentence)
				.then((res) => {
					setPost(res);
					setIsFollowed(res?.isFollowed);
				});
		})();
	};

	const getCommentApiCall = () => {
		(async () => {
			await getComment(sId)
				.then((res) => {
					if (res.comments) {
						return initComment(res.comments);
					}
				})
				.then((res) => {
					setComments(res);
				});
		})();
	};

	useEffect(() => {
		getPostApiCall();
		getCommentApiCall();
	}, []);

	return (
		<>
			<ReturnNavigationBar title={post?.title} />
			<DetailPostOverview
				uId={post?.uId}
				uName={post?.uName}
				nickname={post?.nickname}
				profileImg={post?.profileImg}
				date={post?.date}
				isScraped={post?.isScraped}
				scrapImgs={post?.scrapImgs}
				scrapCount={post?.scrapCount}
				isFollowed={isFollowed}
				setIsFollowed={setIsFollowed}
				isbn={post?.isbn}
				title={post?.title}
				author={post?.author}
				cover={post?.cover}
				sId={post?.sId}
				content={post?.content}
				page={post?.page}
				color={post?.color}
			/>
			<SeparationBar />
			<DetailComment comments={comments} getCommentApiCall={getCommentApiCall} />
			<TabBar selected={1} />
		</>
	);
}

export default DetailPost;
