export const ADD_SELECTED_COVER = "user/ADD_SELECTED_COVER";
export const DELETE_SELECTED_COVER = "user/DELETE_SELECTED_COVER";

export const addSelectedCover = (cId) => ({ type: ADD_SELECTED_COVER, cId });
export const deleteSelectedCover = (cId) => ({ type: DELETE_SELECTED_COVER, cId });

const initialState = {
	selectedCover: [],
};

const user = (state = initialState, action) =>  {
	switch (action.type) {
		case ADD_SELECTED_COVER:
			return {
				...state,
				selectedCover: state.selectedCover.concat(action.cId),
			};
		case DELETE_SELECTED_COVER:
			return {
				...state,
				selectedCover: state.selectedCover.filter((coverId) => coverId !== action.cId),
			};

		default:
			return state;
	}
};

export default user;
