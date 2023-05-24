import React from "react";
import UserProfile from "../../molecules/UserProfile";
import PreviewPost from "./PreviewPost";

function PreviewPostWithProfile({ post }) {
	return (
		<>
			<UserProfile nickname={post?.nickname} profileImg={post?.profileImg} />
			<PreviewPost key={post?.id} post={post} isMy={false} />
		</>
	);
}

export default PreviewPostWithProfile;
