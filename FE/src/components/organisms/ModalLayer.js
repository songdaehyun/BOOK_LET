import React from "react";
import { ModalLayerBox } from "../../styles/common/ModalStyle";
import Modal from "../molecules/Modal";

function ModalLayer({ isOpen, setIsOpen, title, subTitle, leftLabel, rightLabel, action }) {
	const closePopup = (e) => {
		setIsOpen(false);
	};

	return (
		<>
			{isOpen && (
				<ModalLayerBox isOpen={isOpen} onClick={closePopup}>
					<Modal
						title={title}
						subTitle={subTitle}
						leftLabel={leftLabel}
						rightLabel={rightLabel}
						action={action}
						closePopup={closePopup}
					/>
				</ModalLayerBox>
			)}
		</>
	);
}

export default ModalLayer;
