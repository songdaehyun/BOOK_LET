import styled from "styled-components";

export const PreviewSentenceContainer = styled.div`
	width: 100%;

	position: relative;

	margin-bottom: 16px;

	background-color: ${(props) => props.color};
	color: ${(props) => props.color !== "#FEEB60" && "white"};

	border-radius: 10px;

	&::after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
`;

export const PreviewSentenceContent = styled.div`
	width: 100%;
	height: 100%;

	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	padding: 24px;

	// 문장 내용
	> div:nth-child(1) {
		overflow: hidden;
	}
`;

export const PreviewSentenceBottonContent = styled.div`
	display: flex;

	justify-content: space-between;
	margin-top: 32px;

	// 페이지 수
	> div:nth-child(2) {
		display: flex;
		align-items: flex-end;
	}
`;

export const ReactionInfoContainer = styled.div`
	display: flex;
	align-items: center;
	// justify-content: space-around;
	justify-content: space-between;
	margin-bottom: 12px;
`;

export const PreviewCommentContainer = styled.div`
	display: flex;
	justify-content: space-between;

	> div {
		display: flex;
	}

	img {
		margin-right: 8px;
	}
`;

export const ProfileContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;

	> img {
		width: 40px;
		height: 40px;
	}
`;
