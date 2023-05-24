import React from "react";

import RightArrow from "../../atoms/Icon/RightArrow";

import { useNavigate } from "react-router-dom";
import { ArrowButtonContainer } from "../../../styles/common/CommonStyle";
import { Text } from "../../../styles/common/TextsStyle";

function ArrowButton({ title, path }) {
	const navigate = useNavigate();

	const handleClickButton = () => {
		navigate(path);
	};

	return (
		<ArrowButtonContainer onClick={handleClickButton} bottom="16">
			<Text size="19" weight="600" height="28">
				{title}
			</Text>
			<RightArrow />
		</ArrowButtonContainer>
	);
}

export default ArrowButton;
