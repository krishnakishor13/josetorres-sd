import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo.png";
import { getUser } from "../../reducks/users/selectors";
import ProfileHeader from "./ProfileHeader";

const Header = () => {
	const selector = useSelector((state) => state);
	const user = getUser(selector);
	const token = user ? user.token : null;
	const [openModalMenu, setOpenModalMenu] = useState(false);

	return (
		<header className="header">
			<Link to="/">
				<img src={Logo} alt="Logo" height="40" width="96" />
			</Link>
			<div>
				{token ? (
					<button onClick={() => setOpenModalMenu(true)} className="sign-out-btn">
						{user.name}
						<span className="pic arrow-down"></span>
					</button>
				) : (
					<Link to="/sign-in">Sign in</Link>
				)}
                <ProfileHeader
                    user={user} 
                    openModalMenu={openModalMenu}
                    setOpenModalMenu={setOpenModalMenu}
                    />
			</div>
		</header>
	);
};

export default Header;
