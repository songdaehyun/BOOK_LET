import styled from "styled-components";

export const PreviewSwiperBookBox = styled.div`
	display: flex;

	column-gap: 16px;
	margin-top: 24px;

	justify-content: space-between;

	> div {
		width: 30%;
	}
`;

export const PreviewBookOverviewBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	img {
		width: 100%;
		height: auto;

		margin-bottom: 16px;

		filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
		border-radius: 0px 5px 5px 0px;
	}

	// 도서 제목
	> div:nth-child(2) {
		max-height: 38.4px;
		overflow: hidden;
	}
	
	// 저자명
	> div:nth-child(3) {
		max-height: 16px;
		overflow: hidden;
	}
`;

export const BookCoverMoreBox = styled.div`
	box-sizing: border-box;

	font-weight: bold;
	color: var(--primary-600);
	background-color: 1px solid var(--secondary-100);
	border: 1px solid var(--primary-600);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

	text-align: center;
`;
