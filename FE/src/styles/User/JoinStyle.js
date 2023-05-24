import styled from "styled-components";

export const JoinProgressBarWrapper = styled.div`
	width: 100%;
	height: 8px;

	background-color: var(--gray-200);
	border-radius: 5px;

	margin-bottom: 24px;

	> div {
		height: 100%;
		width: calc(${(props) => props.step / 5} * 100%);

		background-color: var(--primary-600);
		border-radius: 5px;
	}
`;

export const JoinFullHeightContainer = styled.div`
	height: 100vh;

	display: flex;
	flex-direction: column;

	padding: 0 16px;

	padding-top: 56px;
`;

export const JoinCenterContainer = styled.div`
	display: flex;

	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-self: center;
`;
export const GenderContainer = styled.div`
	text-align: center;

	margin-bottom: 42px;
`;

export const GenderImgWrapper = styled.div`
	width: 120px;
	height: 120px;

	margin: auto;
	padding: 16px;

	display: flex;
	justify-content: center;

	background: ${(props) => (props.isSelected ? " var(--primary-500)" : "var(--gray-50)")};

	border: ${(props) => (props.isSelected ? "3" : "0.8")}px solid
		${(props) => (props.isSelected ? " var(--primary-700)" : "var(--gray-300)")};
	border-radius: 50%;

	:active {
		background: var(--gray-100);
	}
`;

export const AgeInput = styled.input`
	padding: 8px 24px;

	text-align: center;

	font-size: 40px;

	border: none;
	border-bottom: 1px solid var(--gray-400);

	outline: none;

	:focus {
		border-bottom: 1px solid black;
	}

	::placeholder {
		color: var(--gray-400);
	}
`;

export const CoversContainer = styled.div`
	column-count: 3;
	column-gap: 8px;
`;

export const CoverWrapper = styled.div`
	height: fit-content;

	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	margin-bottom: ${(props) => (props.bottom ? props.bottom : 8)}px;

	filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));

	overflow: hidden;

	> img {
		filter: ${(props) => (props.isSelected ? "blur(2px)" : "none")};
		width: 100%;
	}
`;

export const CricleCheckWrapper = styled.div`
	height: fit-content;

	padding: 2px;

	display: flex;
	position: absolute;
	justify-content: center;
	align-items: center;

	background-color: white;

	border-radius: 50%;
	border: 0.5px solid var(--primary-600);

	svg {
		width: 16px;
		height: 16px;

		fill: var(--primary-600);
	}
`;

export const TagsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;

	column-count: 3;
	column-gap: 16px;
	row-gap: 16px;

	align-items: center;
	justify-content: center;
`;

export const TagWrapper = styled.div`
	width: fit-content;

	display: flex;

	padding: 8px 16px;

	background-color: ${(props) => (props.isSelected ? "var(--primary-600)" : "var(--gray-50)")};

	border: 0.5px solid var(--gray-300);
	border-radius: 20px;
`;
