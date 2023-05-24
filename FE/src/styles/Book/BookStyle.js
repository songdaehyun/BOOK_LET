import styled from "styled-components";
import { Loading } from "../common/CommonStyle";

export const BookHeadingBox = styled.div`
	display: flex;

	align-items: center;
	justify-content: space-between;

	img {
		width: 16px;
		height: 16px;
	}
`;

export const PreviewBookCoverMasonryBox = styled.div`
	column-count: 2;
	column-gap: 16px;

	> div:last-child {
		align-items: center;
		display: grid;
		min-height: 100px;
	}
`;

export const ListBookCoverMasonryBox = styled.div`
	column-count: 2;
	column-gap: 16px;

	margin: 24px 0;
	padding: 0 16px;
`;

export const PreviewBookMasonryOverviewBox = styled.div`
	display: inline-flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 24px;
	// overflow: hidden;

	img {
		width: 100%;
		height: 100%;

		margin-bottom: 16px;

		object-fit: cover;
		filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
	}
`;

export const BookListBox = styled.div`
	display: grid;

	margin: 24px 0;
	padding: 0 16px;

	grid-template-columns: 1fr 1fr 1fr;
	column-gap: 16px;
	row-gap: 24px;
	align-items: baseline;
`;

export const BookSearchHeadingBox = styled.div`
	display: flex;

	> div:first-child {
		flex: 1;
	}

	button {
		margin-bottom: 24px;
		margin-left: 16px;
	}
`;

export const PreviewBookSkeletonBox = styled.div`
	display: flex;
	gap: 16px;
	justify-content: space-between;
`;

export const PreviewBookSkeletonItemBox = styled.div`
	> div {
		background-color: var(--gray-200);
		border-radius: 4px;
		position: relative;

		overflow: hidden;
		position: relative;

		::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 8px;
			height: 100%;

			background-color: #f1f3f5;
			/* background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2); */
			box-shadow: 0 0 16px 16px #f1f3f5;
			/* box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05); */

			animation: ${Loading} 3s infinite linear;
		}
	}

	> div:first-child {
		height: 200px;
		margin-bottom: 16px;
		border-radius: 0px 5px 5px 0px !important;
	}

	> div:nth-child(2) {
		height: 16px;
		margin-bottom: 4px;
	}

	> div:nth-child(3) {
		height: 14px;
	}
`;

export const BookListSkeletonItemBox = styled(PreviewBookSkeletonItemBox)`
	width: 30%;
`;
