import React from "react";
import {
	ModalBox,
	ModalTextBtn,
	ModalTextGroupBox,
	ModalTitleBox,
} from "../../styles/common/ModalStyle";
import { Text } from "../../styles/common/TextsStyle";

function Modal({ title, subTitle, leftLabel, rightLabel, action, closePopup }) {
	const stopEventBubbling = (e) => {
		e.stopPropagation();
	};
	return (
		<ModalBox onClick={stopEventBubbling}>
			<ModalTitleBox>
				<Text weight="600">{title}</Text>
				{subTitle && <Text>{subTitle}</Text>}
			</ModalTitleBox>
			<ModalTextGroupBox>
				<div>
					<ModalTextBtn color="var(--gray-500)" onClick={closePopup}>
						{leftLabel}
					</ModalTextBtn>
				</div>
				<div>
					<ModalTextBtn color="var(--red)" onClick={action}>
						{rightLabel}
					</ModalTextBtn>
				</div>
			</ModalTextGroupBox>
		</ModalBox>
	);
}

export default Modal;
