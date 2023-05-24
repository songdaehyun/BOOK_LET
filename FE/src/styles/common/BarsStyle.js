import styled from "styled-components";
import { Loading } from "./CommonStyle";

export const ActionsNavigationBarWrapper = styled.div`
	width: 100%;
	height: 56px;

	padding: 16px;

	display: flex;
	justify-content: center;
	position: fixed;
	text-align: center;

	background-color: white;

	z-index: 50;

	> button {
		border: none;
		background: none;
	}

	> button:first-child {
		margin-right: auto;
		float: left;
	}

	> span {
		line-height: 24px;
	}

	> button:last-child {
		margin-left: auto;
		float: right;

		color: ${(props) => (props.nextColor ? props.nextColor : "var(--primary-600)")};

		font-weight: bold;
	}
`;

export const ReturnNavigationBarContainer = styled.div`
	width: 100%;

	display: flex;

	// align-items: center;
	// justify-content: center;

	padding: 16px;

	display: flex;
	position: fixed;
	// justify-content: center;
	// text-align: center;

	background-color: white;

	z-index: 50;

	// 화살표 wrapper
	> div:first-child {
		margin-right: 16px;
		display: flex;
		align-items: center;
	}

	img {
		width: 10px;
		height: 16px;
	}

	// 바의 텍스트
	> div:last-child {
		margin: auto;
		padding-right: 10px;
		max-height: 19.2px;
		overflow: hidden;
	}
`;

export const SeparationBar = styled.div`
	width: 100%;
	height: 8px;

	margin-top: ${(props) => props.top}px;
	margin-bottom: ${(props) => props.bottom}px;

	background-color: var(--gray-100);
`;

export const TabBarBox = styled.div`
	padding-top: 12px;
	padding-bottom: 8px;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;

	border-top: 0.5px solid var(--gray-300);
	background-color: white;

	z-index: 50;

	> div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
`;

export const TabBarItemBox = styled.div`
	svg {
		fill: ${(props) => (props.isSelected ? "var(--primary-600)" : "var(--gray-500)")};
	}

	div:last-child {
		color: ${(props) => (props.isSelected ? "var(--primary-600)" : "var(--gray-500)")};
	}
`;

export const MoreBarSkeletonBox = styled.div`
	display: flex;
	width: 100%;
	height: 28px;
	margin-bottom: 16px;

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
			box-shadow: 0 0 16px 16px #f1f3f5;

			animation: ${Loading} 3s infinite linear;
		}
	}

	> div:first-child {
		flex: 1;
		margin-right: 16px;
	}

	> div:nth-child(2) {
		width: 28px;
	}
`;
