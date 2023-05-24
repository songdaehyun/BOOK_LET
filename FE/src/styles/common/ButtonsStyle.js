import styled from "styled-components";

export const PrimaryLargeBtn = styled.button`
	width: 100%;

	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	padding: 12px 24px;

	justify-content: center;
	align-items: center;

	background-color: var(--primary-600);
	color: white;
	font-weight: bold;

	border-radius: 4px;
	border: none;

	:active {
		background-color: var(--primary-700);
	}
`;

export const PrimarySmBtn = styled.button`
	height: fit-content;

	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	padding: 8px 16px;

	justify-content: center;
	align-items: center;

	background-color: var(--primary-600);
	color: white;
	font-weight: bold;
	font-size: ${(props) => props.size}px;

	border-radius: 4px;
	border: none;

	:active {
		background-color: var(--primary-700);
	}
`;

export const TextBtn = styled.button`
	padding: 0;

	font-size: ${(props) => props.size}px;
	color: var(--gray-500);

	border: none;
	background: none;

	:active {
		color: var(--gray-600);
	}
`;

export const ScrapBtn = styled.svg`
	fill: ${(props) => (props.isScraped ? "var(--primary-600)" : "var(--gray-400)")};
`;

export const LikeBtn = styled.svg`
	fill: ${(props) => (props.isLiked ? "var(--red)" : "var(--gray-400)")};
`;

export const FollowBtn = styled(PrimarySmBtn)`
	background-color: var(--secondary-200);
	color: var(--primary-700);
	/* background-color: ${(props) =>
		props.isFollowed ? "var(--gray-100)" : "var(--secondary-200)"};
	color: ${(props) => (props.isFollowed ? "black" : "var(--primary-700)")}; */
	font-size: 14px;

	:active {
		background-color: var(--secondary-300);
		/* props.isFollowed ? "var(--gray-200)" : "var(--secondary-300)"}; */
	}
`;

export const CommentUploadBtn = styled.button`
	width: 32px;
	height: 32px;

	margin-left: 16px;

	border: 0.8px solid var(--gray-300);

	display: flex;
	border-radius: 50%;

	justify-content: center;
	align-items: center;

	background-color: ${(props) => (props.isValid ? "white" : "var(--gray-100)")};
	
	:active {
		background-color: var(--gray-100);
	}
	
	svg {
		fill: ${(props) => (props.isValid ? 'var(--primary-600)' : "var(--gray-500)")};
		
	}
`;

export const SentenceColorRadioBtn = styled.input`
	vertical-align: middle;
	appearance: none;
	/* border: max(2px, 0.1em) solid gray; */
	border-radius: 50%;
	width: 32px;
	height: 32px;

	background: #ffffff;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

	display: inline-block;
	position: relative;

	:after {
		content: "";
		position: absolute;
		top: 2px;
		left: 2px;
		width: 28px;
		height: 28px;
		background: ${(props) => props.color};
		border-radius: 100%;
	}

	:checked {
		border: 0.5px solid #000000;
	}

	:checked:after {
		top: 1.5px;
		left: 1.5px;
	}
`;

export const BookBuyBtn = styled.button`
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 20px;

	background-color: var(--gray-50);
	border: 0.5px solid var(--gray-300);
	border-radius: 4px;

	:active {
		background-color: var(--gray-100);
	}

	img {
		width: auto;
		height: 24px;
	}
`;

export const RatingBtn = styled.svg`
	width: auto;
	height: ${(props) => props.height}px;

	fill: ${(props) => props.isSelected && "var(--yellow)"};
	stroke: ${(props) => !props.isSelected && "var(--yellow)"};
	stroke-width: ${(props) => props.height <= 10 && 2}px;
	/* fill: ${(props) => (props.isSelected ? "var(--yellow)" : "var(--gray-300)")}; */

	:active {
		fill: ${(props) => props.type === "button" && "#fff7bc"};
		stroke: none;
	}

	path {
	}
`;

export const DeleteAccountBtn = styled(PrimaryLargeBtn)`
	background-color: ${(props) => !props.isChecked && " var(--primary-100)"};

	color: ${(props) => !props.isChecked && " var(--primary-500)"};

	:active {
		background-color: ${(props) => !props.isChecked && " var(--primary-200)"};
	}
`;
