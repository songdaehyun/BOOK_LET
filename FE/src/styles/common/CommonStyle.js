import styled, { keyframes } from "styled-components";

export const ValidLabel = styled.div`
	margin-right: 12px;

	display: flex;
	align-items: center;

	svg {
		width: 12px;
		height: 12px;

		margin-right: 4px;

		fill: ${(props) =>
			props.state === "success"
				? "var(--primary-600)"
				: props.state === "fail"
				? "var(--red)"
				: "var(--gray-500)"};
	}

	span {
		font-size: 12px;
		color: ${(props) =>
			props.state === "success"
				? "var(--primary-600)"
				: props.state === "fail"
				? "var(--red)"
				: "var(--gray-500)"};
	}
`;

export const ArrowButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-content: center;
	flex-wrap: wrap;

	margin-bottom: ${(props) => props.bottom}px;

	> svg {
		align-self: center;
	}
`;

export const CommentInputBox = styled.div`
	width: 100%;

	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	padding: 8px 16px;

	display: flex;
	justify-content: space-between;

	background-color: var(--gray-50);

	border: 1px solid var(--gray-200);
	border-radius: 16px;

	:focus {
		outline: 1px solid var(--gray-500);
	}

	> input {
		border: none;
		background-color: transparent;
		outline: none;
		width: 100%;

		::placeholder {
			color: var(--gray-500);
		}
	}
`;

export const CommentBox = styled.div`
	display: flex;

	margin-left: ${(props) => props.depth === 1 && "72"}px;
	margin-bottom: 24px;

	img {
		width: 48px;
		height: 48px;

		margin-right: 24px;

		border-radius: 50%;
		object-fit: cover;
	}

	> div:nth-child(2) {
		flex: 1;
	}
`;

export const ReactionContainer = styled.div`
	// display: flex;
	align-items: center;

	> div:last-child {
		// position: absolute;
	}
`;

export const ReactionImgContainer = styled.div`
	display: flex;
	margin-right: 8px;
	position: relative;

	img {
		border-radius: 50%;
	}

	> div:nth-child(1) {
		left: 16;
	}

	// 두번째 프사 이미지
	> div:nth-child(2) {
		left: 38px;
	}

	// 세번째 프사 이미지
	> div:nth-child(3) {
		left: 60px;
	}
`;

export const ReactionImgWrapper = styled.div`
	padding: 2px;

	display: flex;
	position: absolute;

	background-color: white;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
	border-radius: 50%;

	transform: translate(-60%, -50%);
	left: 16px;

	> img {
		width: 24px;
		height: 24px;

		object-fit: cover;
	}
`;

export const RatingLabelBox = styled.div`
	width: fit-content;

	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1px 8px;
	gap: 8px;

	background: #fffdf1;
	border: 0.5px solid #ffe04b;
	border-radius: 2px;
`;

export const Hr = styled.hr`
	margin: 0;
	margin-top: ${(props) => props.top}px;
	margin-bottom: ${(props) => props.bottom}px;

	border: 0;
	height: 0.5px;
	background-color: var(--gray-100);
`;

export const EmptyBox = styled.div`
	width: fit-content;

	margin: auto;
	margin-top: ${(props) => (props.top ? props.top : 80)}px;

	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	> div {
		margin-top: 32px;
		margin-bottom: 24px;
	}

	> svg {
		width: 90%;
	}

	path:first-child {
		fill: var(--gray-100);
	}

	path:nth-child(2) {
		fill: var(--gray-500);
	}

	path:nth-child(3) {
		fill: var(--gray-500);
	}

	path:nth-child(4) {
		fill: var(--gray-500);
	}
`;

export const UserImageBox = styled.div`
	width: ${(props) => (props.size === "sm" ? "40" : props.size === "lg" && "80")}px;
	height: ${(props) => (props.size === "sm" ? "40" : props.size === "lg" && "80")}px;

	border-radius: 50%;
	border: ${(props) => props.isDefault && "0.8px solid var(--gray-500)"};

	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	div {
	}
`;

export const Loading = keyframes`
	  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
  `;
