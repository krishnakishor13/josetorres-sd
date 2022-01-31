import React from "react";

import Header from "../components/default/Header";
import SignupForm from "../components/landing-page/SignupForm";

export default function SignUp() {
	return (
		<>
			<Header />
			<div className="sign-up">
				<div className="title">Sign Up and manage your balances</div>
				<div className="description">
					Note down your expenditure and income, then check your balances everyday
				</div>
				<div className="form-container">
					<SignupForm />
				</div>
			</div>
		</>
	);
}
