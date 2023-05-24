import React from "react";
import { SentenceColorRadioBtn } from "../../../styles/common/ButtonsStyle";

function SentenceColorRadioButton({ isDefault, color, value, setBackground }) {
	const handleChange = (e) => {
		setBackground(e.target.value);
	};

	return (
		<SentenceColorRadioBtn
			type="radio"
			name="background"
			value={value}
			defaultChecked={isDefault}
			color={color}
			onChange={handleChange}
		/>
	);
}

export default SentenceColorRadioButton;
