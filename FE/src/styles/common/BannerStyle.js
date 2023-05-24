import styled from "styled-components";

export const TopBannerContainer = styled.div`
	height: 160px;

	padding: 24px 16px;

	background-color: var(--gray-50);

	display: flex;
	justify-content: space-between;

	> div:first-child {
		margin-right: 8px;
	}
`;

export const BannerImgBox = styled.div`
	height: 100%;

	img {
		width: auto;
		height: 100%;
	}
`;
