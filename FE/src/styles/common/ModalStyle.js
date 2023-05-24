import styled, { keyframes } from "styled-components";
import { TextBtn } from "./ButtonsStyle";

const modalShow = keyframes`
	from {
	  opacity: 0;
	  margin-top: -50px;
	}
	to {
	  opacity: 1;
	  margin-top: 0;
	}
  `;

const modalBgShow = keyframes`
	from {
	  opacity: 0;
	}
	to {
	  opacity: 1;
	}
  `;

export const ModalLayerBox = styled.div`
	display: ${(props) => (!props.isOpen ? "none" : "flex")};
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.6);

	animation: ${modalBgShow} 0.3s;

	text-align: center;
`;

export const ModalBox = styled.div`
	width: 80%;
	max-width: 450px;
	height: fit-content;

	padding-bottom: 0;
	margin: 0 auto;

	align-items: center;
	align-self: center;

	background: #ffffff;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
	border-radius: 10px;

	/* 팝업이 열릴때 스르륵 열리는 효과 */
	animation: ${modalShow} 0.3s;
	overflow: hidden;
`;

export const ModalTextGroupBox = styled.div`
	display: flex;
	justify-content: space-between;

	/* border-top: 0.5px solid var(--gray-300); */

	> div {
		width: 50%;
		padding: 16px 0;
		text-align: center;
	}

	> div:first-child {
		/* border-right: 0.5px solid var(--gray-300); */
	}
`;

export const ModalTextBtn = styled(TextBtn)`
	color: ${(props) => (props.color ? props.color : "black")};
	font-size: 16px !important;
	font-weight: 600;
`;

export const ModalTitleBox = styled.div`
	padding: 32px 16px;
`;
