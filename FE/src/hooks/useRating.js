import { useDispatch, useSelector } from "react-redux";
import { setIsSelected, setSelectedRating } from "../reducer/book";

export default function useRating() {
	const dispatch = useDispatch();

	const { isSelected } = useSelector((state) => state.book);

	const selectRating = (rating) => {
		let stars = [...isSelected];
		for (let i = 0; i < 5; i++) {
			if (i <= rating - 1) {
				stars[i] = true;
			} else {
				stars[i] = false;
			}
		}

		dispatch(setSelectedRating(rating));
		dispatch(setIsSelected(stars));
	};

	return selectRating;
}
