import React from "react";

import { ActionsNavigationBarWrapper } from "../../../styles/common/BarsStyle";

function ActionsNavigationBar({ pre, title, next, handleClickPre, handleClickNext, nextColor }) {
	return (
		<ActionsNavigationBarWrapper nextColor={nextColor}>
			<button onClick={handleClickPre}>{pre}</button>
			<span>{title}</span>
			<button onClick={handleClickNext}>{next}</button>
		</ActionsNavigationBarWrapper>
	);
}

export default ActionsNavigationBar;
