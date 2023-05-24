import styled from "styled-components";

export const SentenceTextareaBox = styled.div`
	width: 100%;

	position: relative;

	background-color: ${(props) => props.color};
	border-radius: 8px;

	::after {
		display: block;
		content: "";
		padding-bottom: 100%;
	}

	textarea {
		width: 100%;
		height: 100%;

		padding: 24px;

		position: absolute;

		border: none;
		resize: none;
		outline: none;
		line-height: 28px;

		background-color: transparent;

		color: ${(props) => props.color !== "#FEEB60" && "white"};

		::placeholder {
			color: ${(props) => (props.color !== "#FEEB60" ? "white" : "var(--gray-600)")};
		}
	}
`;

export const SentenceColorRadioButtonGroupBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const WordCountTextBox = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export const PageInputBox = styled.div`
	display: flex;
	align-items: center;
`;

export const SentenceBookSearchBox = styled.div`
	position: relative;
`;

export const SentenceBookSearchBarBox = styled.div`
	padding: 16px;
	margin-bottom: 24px;

	background: var(--gray-50);
	border: 0.5px solid var(--gray-500);
	border-radius: 8px;

	> div {
		width: 100%;
	}

	input {
		width: 100%;

		padding: 0;

		background-color: transparent;
		border: none;
		outline: none;

		::placeholder {
			color: var(--gray-500);
			font-weight: 600;
		}
	}
`;

export const SentenceBookSearchInputBox = styled.div`
	display: flex;

	img {
		width: 14px;
		height: 14px;

		margin-right: 16px;
		margin-top: 4px;
	}

	> div {
		> div:nth-child(2) {
			margin-top: 8px;
		}
	}
`;

export const SentenceBookSearchResultBox = styled.div`
	display: flex;

	img {
		width: 44px;

		margin-right: 16px;
	}

	> div {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
`;

export const SentenceBookAutoSearchBox = styled.div`
	width: 100%;

	padding: 15px;
	row-gap: 24px;

	display: ${(props) => (props.isOpen ? "flex" : "none")};
	flex-direction: column;
	position: absolute;
	z-index: 3;

	top: 88px;
	left: 0;
	right: 0;

	border: 2px solid;
	background-color: #fff;

	background: #ffffff;
	border: 0.5px solid var(--gray-300);
	border-radius: 8px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
`;

export const SentencePageInputBox = styled.div`
	width: 100%;

	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	padding: 12px 16px;

	display: flex;
	align-items: center;	

	background-color: var(--gray-50);
	border: 1px solid var(--gray-200);
	border-radius: 4px;

	:focus {
		outline: 1px solid var(--gray-500);
	}

	input {
		width: 100%;

		background: none;
		border: none;
		outline: none;

		::placeholder {
			color: var(--gray-500);
		}
	}
`;
