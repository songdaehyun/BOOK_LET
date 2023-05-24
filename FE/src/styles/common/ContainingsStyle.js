import styled from "styled-components";

export const Container = styled.div`
	padding-top: ${(props) => props.paddingTop}px;
	padding-bottom: ${(props) => props.paddingBottom}px;
	padding-left: ${(props) => props.paddingLeft}px;
	padding-right: ${(props) => props.paddingRight}px;

	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	margin-left: ${(props) => props.marginLeft}px;
	margin-right: ${(props) => props.marginRight}px;
`;

export const OverflowHiddenBox = styled(Container)`
	overflow: hidden;
`;

export const ValidWrapper = styled.div`
	margin-top: 4px;
`;

export const ValidLabelContainer = styled.div`
	display: flex;
`;
