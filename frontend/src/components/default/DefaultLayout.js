import React from "react";
import { Slot } from "react-page-layout";
import { useHistory } from "react-router";
import Header from "./Header";
import dashboard from "../../assets/images/dashboard.png";
import list from "../../assets/images/list_alt.png";
import profile from "../../assets/images/account_circle.png";
import dashboardActive from "../../assets/images/dashboard_white.png";
import listActive from "../../assets/images/list_alt_white.png";
import profileActive from "../../assets/images/account_circle_white.png";
import { Link } from "react-router-dom";

export default function DefaultLayout() {
	const history = useHistory();
	const { pathname } = history.location;
	return (
		<div className="main-wrapper">
			<Header />
			<div className="content-wrapper">
				<aside className="sidebar">
					<ul>
						<Link to="/">
							<li className={pathname === "/" ? "active-sidebar" : ""}>
								<img width="40" height="40" src={pathname === "/" ? dashboardActive : dashboard} alt="dashboard-icon" />
								<span>Dashboard</span>
							</li>
						</Link>
						<Link to="/transaction">
							<li className={pathname === "/transaction" ? "active-sidebar" : ""}>
								<img width="40" height="40" src={pathname === "/transaction" ? listActive : list} alt="list-icon" />
								<span>Transaction List</span>
							</li>
						</Link>
						<Link to="/profile">
							<li className={pathname === "/profile" ? "active-sidebar" : ""}>
								<img width="40" height="40" src={pathname === "/profile" ? profileActive : profile} alt="profile-icon" />
								<span>My Profile</span>
							</li>
						</Link>
					</ul>
				</aside>
				<div className="content">
					<Slot name="breadcrumbs" className="second-nav-bar" />
					<Slot name="main" component="section" />
				</div>
			</div>
		</div>
	);
}
