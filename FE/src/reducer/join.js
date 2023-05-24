export const SET_ID = "join/SET_ID";
export const SET_NICKNAME = "join/SET_NICKNAME";
export const SET_PW = "join/SET_PW";
export const SET_EMAIL = "join/SET_EMAIL";
export const SET_AGE = "join/SET_AGE";
export const SET_GENDER = "join/SET_GENDER";

export const setId = (id) => ({ type: SET_ID, id });
export const setNickname = (nickname) => ({ type: SET_NICKNAME, nickname });
export const setPw = (pw) => ({ type: SET_PW, pw });
export const setEmail = (email) => ({ type: SET_EMAIL, email });
export const setAge = (age) => ({ type: SET_AGE, age });
export const setGender = (gender) => ({ type: SET_GENDER, gender });

const initialState = {
	id: "",
	nickname: "",
	pw: "",
	email: "",
	age: "",
	gender: 0
};

const join = (state = initialState, action) => {
	switch (action.type) {
		case SET_ID:
			return {
				...state,
				id: action.id
			};
		case SET_NICKNAME:
			return {
				...state,
				nickname: action.nickname
			};
		case SET_PW:
			return {
				...state,
				pw: action.pw
			};
		case SET_EMAIL:
			return {
				...state,
				email: action.email
			};
		case SET_AGE:
			return {
				...state,
				age: action.age
			};
		case SET_GENDER:
			return {
				...state,
				gender: action.gender
			};
		// default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
		default:
			return state;
	}
};

export default join;
