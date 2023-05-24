export default function useDate() {
	const dateTimeSeparation = (date) => {
		// seperatedDate[0] is date
		// seperatedDate[1] is time
		const seperatedDate = date?.split("T");

		const realTimeDate = new Date();

		let year = realTimeDate.getFullYear();

		let month = realTimeDate.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}

		let day = realTimeDate.getDate();
		if (day < 10) {
			day = "0" + day;
		}

		const today = year + "-" + month + "-" + day;

		// 오늘 날짜라면 시간을, 오늘 날짜가 아니라면 날짜를 리턴
		if (seperatedDate) {
			if (seperatedDate[0] === today) {
				// times[0] is hour
				// times[1] is minute
				const times = seperatedDate[1].split(".")[0].split(":");

				return times[0] + "시 " + times[1] + "분";
			} else {
				return seperatedDate[0].replaceAll("-", ".");
			}
		}
	};

	return dateTimeSeparation;
}
