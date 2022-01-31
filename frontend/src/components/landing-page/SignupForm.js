import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signUpError } from "../../reducks/users/actions";
import { signUp } from "../../reducks/users/operations";
import { getUser } from "../../reducks/users/selectors";

export default function SignupForm() {
	let history = useHistory();
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const errors = getUser(selector).errors;

	const initialValues = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	const [values, setValues] = useState(initialValues);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	const onSubmit = async () => {
		if (values.password !== values.password_confirmation) {
			dispatch(signUpError({ password: ["Password are not the same."] }));
			return;
		}

		setIsLoading(true);
		await dispatch(signUp(values));
		setIsLoading(false);
		history.push("/");
	};

	return (
		<form action="#">
			<label htmlFor="name">Name</label>
			<input
				id="name"
				name="name"
				type="text"
				value={values.name}
				onChange={handleInputChange}
				placeholder="Type your name"
			/>
			<label htmlFor="email">Email address</label>
			<input
				id="email"
				name="email"
				type="email"
				value={values.email}
				onChange={handleInputChange}
				placeholder="Type your email"
			/>
			{errors.email ? <span className="error-text">{errors.email[0]}</span> : null}
			<label htmlFor="password">Password</label>
			<div className="input-group">
				<input
					name="password"
					type="password"
					value={values.password}
					onChange={handleInputChange}
					placeholder="Type password"
				/>
				<input
					name="password_confirmation"
					type="password"
					value={values.password_confirmation}
					onChange={handleInputChange}
					placeholder="Re-type password"
				/>
			</div>
			{errors.password ? <span className="error-text">{errors.password[0]}</span> : null}
			<button className="mt-2 custom-btn" type="button" onClick={onSubmit}>
				{isLoading ? "Registering..." : "Register"}
			</button>
		</form>
	);
}
