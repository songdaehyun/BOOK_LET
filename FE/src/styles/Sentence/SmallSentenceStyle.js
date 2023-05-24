import styled from "styled-components";

export const SmallSentenceContainer = styled.div`
	/* width: 70%; */
	position: relative;
	// width: 160px;
	// height: 160px;

	border-radius: 8px;

	background-color: ${(props) => props.color};
	color: ${(props) => props.color !== "#FEEB60" && "white"};

	::after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
`;

export const SmallSentenceContent = styled.div`
	width: 100%;
	height: 100%;

	padding: 12px;

	position: absolute;
	display: flex;

	> div {
		overflow: hidden;
	}
`;
