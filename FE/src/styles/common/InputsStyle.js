import styled from "styled-components";

export const DefaultInput = styled.input`
	width: 100%;

	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	padding: 12px 16px;

	background-color: var(--gray-50);

	border: 1px solid var(--gray-200);
	border-radius: 4px;

	::placeholder {
		color: var(--gray-500);
	}

	:focus {
		outline: 1px solid var(--gray-500);
	}
`;
