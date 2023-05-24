import React from "react";
import {
	getCoverBookRecomPre,
	getGenreBookRecomPre,
	getLikeBookRecomPre,
	getRatingBookRecomPre,
	getUserBookRecomPre,
} from "../../../apis/BookApi";
import { initBookRecom } from "../../../apis/init/initBook";
import useAsync from "../../../hooks/useAsync";
import { OverflowHiddenBox } from "../../../styles/common/ContainingsStyle";
import { Span } from "../../../styles/common/TextsStyle";
import TabBar from "../../molecules/Bar/TabBar";
import BookHeading from "../../molecules/Book/BookHeading";
import PreviewBookSection from "../../organisms/Book/PreviewBookSection";

function Book(props) {
	const uName = localStorage.getItem("userName");

	const [userState] = useAsync(getUserBookRecomPre, uName, initBookRecom, []);
	const { loading: userLoading, data: userBooks, error: userError } = userState;

	const [likeState] = useAsync(getLikeBookRecomPre, uName, initBookRecom, []);
	const { loading: likeLoading, data: likeBooks, error: likeError } = likeState;

	const [coverState] = useAsync(getCoverBookRecomPre, uName, initBookRecom, []);
	const { loading: coverLoading, data: coverBooks, error: coverError } = coverState;

	const [genreState] = useAsync(getGenreBookRecomPre, uName, initBookRecom, []);
	const { loading: genreLoading, data: genreBooks, error: genreError } = genreState;

	const [ratingState] = useAsync(getRatingBookRecomPre, uName, initBookRecom, []);
	const { loading: ratingLoading, data: ratingBooks, error: ratingError } = ratingState;

	const userRecomTitle = (
		<>
			<Span size="19" weight="bold" color="var(--primary-600)">
				{userBooks?.age}세 {userBooks?.gender}
			</Span>
			이 많이 읽고 있어요
		</>
	);
	const userRecomErrTitle = (
		<>
			같은 연령대와 성별에서
			<br /> 많이 읽고 있어요
		</>
	);

	const ratingRecomErrTitle = <>높은 평점을 주실 책이에요</>;
	const ratingRecomTitle = (
		<>
			<Span size="19" weight="bold" color="var(--primary-600)">
				{ratingBooks?.nickname}
			</Span>
			님이 <br />
			높은 평점을 주실 책이에요
		</>
	);

	const likeRecomTitle = <>이것들 또한 좋아하게 될거예요</>;

	const genreRecomTitle = (
		<>
			오늘&nbsp;
			<Span size="19" weight="bold" color="var(--primary-600)">
				{genreBooks?.genre}
			</Span>
			&nbsp;분야는 어때요?
		</>
	);
	const genreRecomErrTitle = <>오늘 이런 장르는 어때요?</>;

	const coverRecomTitle = <>좋아하실만한 표지의 책이에요</>;

	const emptyInfo = {
		title: `아직 관련 내역이 없어요`,
		subTitle: (
			<>
				좋아요와 리뷰를 남겨주시면
				<br /> 마음에 들 추천을 해드릴게요
			</>
		),
		buttonLabel: "책 탐색하러 가기",
		path: "/book/search",
	};

	return (
		<>
			<OverflowHiddenBox
				paddingTop="24"
				paddingLeft="16"
				paddingRight="16"
				paddingBottom="51"
			>
				<BookHeading />
				<PreviewBookSection
					title={userRecomTitle}
					errTitle={userRecomErrTitle}
					books={userBooks?.books}
					path="recom/user"
					loading={userLoading}
					error={userError}
				/>
				<PreviewBookSection
					title={genreRecomTitle}
					errTitle={genreRecomErrTitle}
					books={genreBooks?.books}
					path="recom/genre"
					emptyInfo={emptyInfo}
					loading={genreLoading}
					error={genreError}
				/>
				<PreviewBookSection
					title={likeRecomTitle}
					books={likeBooks?.books}
					path="recom/like"
					emptyInfo={emptyInfo}
					loading={likeLoading}
					error={likeError}
				/>
				<PreviewBookSection
					title={ratingRecomTitle}
					errTitle={ratingRecomErrTitle}
					books={ratingBooks?.books}
					path="recom/rating"
					emptyInfo={emptyInfo}
					loading={ratingLoading}
					error={ratingError}
				/>
				<PreviewBookSection
					title={coverRecomTitle}
					books={coverBooks?.books}
					type={coverBooks?.type}
					path="recom/cover"
					loading={coverLoading}
					error={coverError}
				/>
			</OverflowHiddenBox>
			<TabBar selected={2} />
		</>
	);
}

export default Book;
