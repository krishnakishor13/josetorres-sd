import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { LOGIN_USER_KEY } from "../../API";
import defaultProfile from '../../assets/images/account_circle.png'

import { signOutAction } from "../../reducks/users/actions";

export default function ProfileHeader(props) {
	const { user, openModalMenu, setOpenModalMenu } = props;
	const [openModalSignOut, setOpenModalSignOut] = useState(false);

	const history = useHistory();
	const dispatch = useDispatch();

	const signOutHandler = () => {
		dispatch(signOutAction());
		localStorage.removeItem(LOGIN_USER_KEY);
		setOpenModalSignOut(false);
		history.push("/");
	};

	return (
		<>
			<div id="custom-modal" className={`custom-modal ${openModalMenu ? "" : "modal-hide"}`}>
				<div id="custom-modal-close" onClick={() => setOpenModalMenu(false)} className="custom-modal--bg"></div>
				<div className="custom-modal-header--container">
					<div className="menu-container">
						<div className="custom-modal-header--cancel">
							<span onClick={() => setOpenModalMenu(false)} className="pic arrow-down"></span>
						</div>
						<ul className="user-menu">
							<div className="profile-highlight">
								<img src={user.profile ?? defaultProfile} alt="profile-img" width={36} height={36} />
								<div className="details">
									<div id="profile-name">{user.name}</div>
									<div id="profile-footer">{user.email}</div>
								</div>
							</div>
							<li className="user-menu__item">
								<Link className="user-menu-link" to="/profile">
									<div>Edit Profile</div>
								</Link>
							</li>
							<li className="user-menu__item">
								<Link className="user-menu-link" to="/profile">
									<div>View Profile</div>
								</Link>
							</li>
							<div className="footer">
								<li className="user-menu__item">
									<Link onClick={() => setOpenModalSignOut(true)} className="user-menu-link" to="#">
										Logout
									</Link>
								</li>
							</div>
						</ul>
					</div>
				</div>
			</div>
			<div id="custom-modal" className={`custom-modal ${openModalSignOut ? "" : "modal-hide"}`}>
				<div
					id="custom-modal-close"
					onClick={() => setOpenModalSignOut(false)}
					className="custom-modal--bg"
				></div>
				<div className="custom-modal-sign-out--container">
					<div className="custom-modal-sign-out--content">
						<div className="modal-sign-out-content">
							<strong>Are you sure you want to sign out?</strong>
							<div>
								<button className="custom-btn mr-1" onClick={signOutHandler}>
									Yes
								</button>
								<button className="custom-btn ml-1" onClick={() => setOpenModalSignOut(false)}>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
