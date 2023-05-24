export const SET_SELECTED_RATING = "sentence/SET_SELECTED_RATING";
export const SET_IS_SELECTED = "sentence/SET_IS_SELECTED";

export const setSelectedRating = (rating) => ({ type: SET_SELECTED_RATING, rating });
export const setIsSelected = (is) => ({ type: SET_IS_SELECTED, is });

const initialState = {
	selectedRating: 0,
	isSelected: [false, false, false, false, false],
};

const book = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_RATING:
			return {
				...state,
				selectedRating: action.rating,
			};
		case SET_IS_SELECTED:
			return {
				...state,
				isSelected: action.is,
			};

		// default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
		default:
			return state;
	}
};

export default book;
