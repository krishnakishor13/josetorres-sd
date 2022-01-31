import API, { LOGIN_USER_KEY } from "../../API";
import {
	signUpAction,
	signUpError,
	signInAction,
	signInError,
	updateProfileAction,
	updateProfileError,
	updateBudgetAction,
} from "./actions";

const api = new API();

export const fetchUserFromLocalStorage = () => {
	return async (dispatch) => {
		const userJSON = localStorage.getItem(LOGIN_USER_KEY);
		if (userJSON && userJSON.token !== "") {
			dispatch(signInAction(JSON.parse(userJSON)));
		}
	};
};

export const signUp = (data = {}) => {
	return async (dispatch) => {
		return api
			.signUp(data)
			.then((response) => {
				localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
				dispatch(signUpAction(response));
			})
			.catch((error) => {
				dispatch(signUpError(error.response.data));
			});
	};
};

export const updateProfile = (data = {}, id) => {
	return async (dispatch) => {
		return api
			.updateProfile(data, id)
			.then((response) => {
				localStorage.setItem(
					LOGIN_USER_KEY,
					JSON.stringify(response)
				);
				dispatch(updateProfileAction(response));
			})
			.catch((error) => {
				dispatch(updateProfileError(error.response.data));
			});
	};
};

export const updateBudget = (data = {}, id) => {
	return async (dispatch) => {
		return api
			.updateBudget(data, id)
			.then((response) => {
				dispatch(updateBudgetAction(response));
			})
			.catch((error) => {
				console.error(error)
			});
	};
};

export const signIn = (data = {}, onSuccess = null) => {
	return async (dispatch) => {
		return api
			.signIn(data)
			.then((response) => {
				localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
				dispatch(signInAction(response));
				onSuccess();
			})
			.catch((error) => {
				dispatch(signInError(error.response.data));
			});
	};
};
