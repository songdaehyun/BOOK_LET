// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const SET_POST = "sentence/SET_POST";

export const setPost = (post) => ({ type: SET_POST, post });

const initialState = {
	post: "",
};

const sentence = (state = initialState, action) => {
	switch (action.type) {
		case SET_POST:
			return {
				...state,
				post: action.post,
			};

		// default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
		default:
			return state;
	}
};

export default sentence;
