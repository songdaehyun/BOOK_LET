export const initCheck = (raw) => {
	if (raw === "available") {
		return "success";
	} else if (raw === "duplicate") {
		return "fail";
	}
};
