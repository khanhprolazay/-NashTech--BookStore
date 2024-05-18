/** @format */

import logo from "../../login/assets/bookworm-icon.svg";
import books from "../../login/assets/books.png";
export default function LoginLogo() {
	return (
		<div className="login__logo-container">
			<div className="flex items-center" style={{ gap: "16px", alignItems: "end"}}>
				<img alt="login-go" id="logo" src={logo} style={{ height: "64px" }} />
				<div>
					<h1 className="login__intro">Welcome to Bookworm</h1>
					<p className="login__description ">
						The popular book selling platform
					</p>
				</div>
			</div>
			{/* <div className="login__logo"></div> */}
			<img alt="login-go" src={books} style={{ height: "286px", marginTop: "24px" }} />
		</div>
	);
}
