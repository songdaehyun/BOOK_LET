import React from "react";
import { SentenceColorRadioButtonGroupBox } from "../../../styles/Sentence/SentenceFormStyle";
import SentenceColorRadioButton from "../../atoms/Button/SentenceColorRadioButton";

function SentenceColorRadioButtonGroup({ setBackground }) {
	return (
		<SentenceColorRadioButtonGroupBox>
			<SentenceColorRadioButton
				setBackground={setBackground}
				isDefault={true}
				value="#FEEB60"
				color="var(--yellow)"
			/>
			<SentenceColorRadioButton
				setBackground={setBackground}
				value="#ff8e99"
				color="var(--pink)"
			/>
			<SentenceColorRadioButton
				setBackground={setBackground}
				value="#769676"
				color="var(--green)"
			/>
			<SentenceColorRadioButton
				setBackground={setBackground}
				value="#9FA3D0"
				color="var(--blue)"
			/>
			<SentenceColorRadioButton
				setBackground={setBackground}
				value="#71408d"
				color="var(--purple)"
			/>
			<SentenceColorRadioButton
				setBackground={setBackground}
				value="#B88962"
				color="var(--brown)"
			/>
		</SentenceColorRadioButtonGroupBox>
	);
}

export default SentenceColorRadioButtonGroup;
