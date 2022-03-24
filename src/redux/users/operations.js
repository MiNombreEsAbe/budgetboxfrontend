import API, { LOGIN_USER } from "../../API";
import {
	signUpAction,
	signUpErrorAction,
	signInAction,
	signInErrorAction,
	updateProfileAction,
	updateProfileErrorAction,
	updateBudgetAction,
} from "./actions";

const api = new API();

export const fetchUserFromLocalStorage = () => {
	return async dispatch => {
		const userJSON = localStorage.getItem(LOGIN_USER);
		if (userJSON) {
			dispatch(signInAction(JSON.parse(userJSON)));
		}
	};
};

export const signUp = (data = {}) => {
	return async dispatch => {
		return api
			.signUp(data)
			.then(res => {
				console.log(res)
				localStorage.setItem(LOGIN_USER, JSON.stringify(res));
				dispatch(signUpAction(res));
			})
			.catch(err => {
				dispatch(signUpErrorAction(err.response.data));
			});
	};
};

export const updateProfile = (data = {}, id) => {
	return async dispatch => {
		return api
			.updateProfile(data, id)
			.then(res => {
				// console.log(res)
				localStorage.setItem(
					LOGIN_USER,
					JSON.stringify(res)
				);
				dispatch(updateProfileAction(res));
			})
			.catch(err => {
				dispatch(updateProfileErrorAction(err.response.data));
			});
	};
};

export const updateBudget = (data = {}, id) => {
	return async dispatch => {
		return api
			.updateBudget(data, id)
			.then(res => {
				localStorage.setItem(LOGIN_USER, JSON.stringify(res));
				dispatch(updateBudgetAction(res));
			})
			.catch(err => {
				console.error(err)
			});
	};
};

export const signIn = (data = {}) => {
	return async dispatch => {
		return api
			.signIn(data)
			.then(res => {
				localStorage.setItem(LOGIN_USER, JSON.stringify(res));
				dispatch(signInAction(res));
			})
			.catch(err => {
				dispatch(signInErrorAction(err.response.data));
			});
	};
};
