import React from "react";

import { JoinProgressBarWrapper } from "../../../styles/User/JoinStyle";

function JoinProgressBar({ step }) {
	return (
		<JoinProgressBarWrapper step={step}>
			<div step={step} />
		</JoinProgressBarWrapper>
	);
}

export default JoinProgressBar;
