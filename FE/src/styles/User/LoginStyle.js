import styled from "styled-components";

export const LogoBox = styled.div`
	margin-bottom: 56px;

	> img {
		width: 30%;
	}
`;

export const ImgWrapper = styled.div`
	// 책 중앙 정렬처럼 보이기 위하여
	padding-left: 24px;

	display: flex;
	justify-content: center;

	> img {
		width: 90%;
		max-width: 500px;
	}
`;

export const TextBtnWrapper = styled.div`
	float: right;

	> button {
		text-decoration-line: underline;
	}
`;
