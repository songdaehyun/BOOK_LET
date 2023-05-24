import styled from "styled-components";

export const BookDetailOverviewBox = styled.div`
	padding-top: 51px;

	display: flex;
	flex-direction: column;

	> img {
		width: 40%;
		align-self: center;

		margin-top: 16px;
		margin-bottom: 40px;

		filter: drop-shadow(rgba(0, 0, 0, 0.35) 0px 0px 10px);
		border-radius: 0px;
	}
`;

export const InputRatingSectionBox = styled.div`
	margin-top: 8px;
	margin-bottom: 24px;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const RatingBox = styled.div`
	column-gap: ${(props) => props.gap}px;
	display: flex;
`;

export const RatingEditBox = styled.div`
	display: flex;
	align-items: center;
	
	> div:nth-child(2) {
		margin-top: 0;
		margin-left: 8px;
	}
`

export const CommentHeadingBox = styled.div`
	margin-bottom: 4px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const CommentDateBox = styled.div`
	margin-left: auto;
	float: right;
`;

export const CommentBtnsBox = styled.div`
	display: flex;
	gap: 16px;
`;

export const CommentBtnBox = styled.div`
	display: flex;
	gap: 16px;
`;

export const ReplyBox = styled.div`
	display: flex;

	> div:first-child {
		flex: 1;
	}

	button {
		margin-left: 16px;
	}
`;
