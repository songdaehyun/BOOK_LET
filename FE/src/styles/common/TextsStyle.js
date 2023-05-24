import styled from "styled-components";

export const Text = styled.div`
	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	margin-left: ${(props) => props.marginLeft}px;
	margin-right: ${(props) => props.marginRight}px;

	font-family: ${(props) => props.font === "jeju" && "JejuMyeongjo"};
	font-size: ${(props) => props.size}px;
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};

	line-height: ${(props) => props.height}px;
`;

export const Span = styled.span`
	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	margin-left: ${(props) => props.marginLeft}px;
	margin-right: ${(props) => props.marginRight}px;

	font-family: ${(props) => props.font === "jeju" && "JejuMyeongjo"};
	font-size: ${(props) => props.size}px;
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};

	line-height: ${(props) => props.height}px;
`;

export const ValidFailText = styled.span`
	font-size: 14px;
	color: var(--red);
`;

export const Label = styled.label`
	font-size: ${(props) => props.size}px;
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
`;
