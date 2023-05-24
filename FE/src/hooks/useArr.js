export default function useArr() {
	const isArrEmpty = (arr) => {
		if (arr?.length === 0) {
			return true;
		} else {
			return false;
		}
	};

	return isArrEmpty;
}
