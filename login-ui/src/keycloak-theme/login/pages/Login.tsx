/** @format */

import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import "@patternfly/react-core/dist/styles/base.css";
import LoginLogo from "../../components/logo/login.logo";
import GoogleLogo from "../../components/logo/google.logo";
import FacebookLogo from "../../components/logo/facebook.logo";

const my_custom_param = new URL(window.location.href).searchParams.get(
	"my_custom_param"
);

if (my_custom_param !== null) {
	console.log("my_custom_param:", my_custom_param);
}

function getLogo(providerId: string) {
	switch (providerId) {
		case "google":
			return <GoogleLogo />;
		case "facebook":
			return <FacebookLogo />;
		default:
			return <></>;
	}
}

export default function Login(
	props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
	const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

	const { getClassName } = useGetClassName({
		doUseDefaultCss,
		classes,
	});

	const {
		social,
		realm,
		url,
		usernameHidden,
		login,
		auth,
		registrationDisabled,
	} = kcContext;

	const { msg, msgStr } = i18n;

	const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

	const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
		e.preventDefault();

		setIsLoginButtonDisabled(true);

		const formElement = e.target as HTMLFormElement;

		//NOTE: Even if we login with email Keycloak expect username and password in
		//the POST request.
		formElement
			.querySelector("input[name='email']")
			?.setAttribute("name", "username");

		formElement.submit();
	});

	return (
		<>
			<Template
				{...{ kcContext, i18n, doUseDefaultCss, classes }}
				// displayInfo={social.displayInfo}
				displayWide={true}
				headerNode={msg("doLogIn")}
				imageNode={<LoginLogo />}
				extraNode={
					realm.password &&
					social.providers && (
						<div
							id="kc-social-providers"
							className={clsx(
								getClassName("kcFormSocialAccountContentClass"),
								getClassName("kcFormSocialAccountClass")
							)}>
							<ul
								className={clsx(
									getClassName("kcFormSocialAccountListClass")
									// social.providers.splice(0, 2).length > 4 && getClassName("kcFormSocialAccountDoubleListClass")e
								)}>
								<>
									{social.providers.map((p) => (
										<li
											key={p.providerId}
											className={getClassName(
												"kcFormSocialAccountListLinkClass"
											)}>
											<a
												href={p.loginUrl}
												id={`zocial-${p.alias}`}
												className={clsx("zocial", p.providerId)}>
												{getLogo(p.providerId)}
												<span>{p.displayName}</span>
											</a>
										</li>
									))}
								</>
							</ul>
							<div className="social-divider">or sign in with</div>
						</div>
					)
				}>
				<div
					id="kc-form"
					// style={{ width: "36rem" }}
					className={clsx(
						realm.password &&
							social.providers &&
							getClassName("kcContentWrapperClass")
					)}>
					<div
						id="kc-form-wrapper"
						className={clsx(
							realm.password &&
								social.providers && [
									getClassName("kcFormSocialAccountContentClass"),
									getClassName("kcFormSocialAccountClass"),
								]
						)}>
						{realm.password && (
							<>
								<form
									id="kc-form-login"
									onSubmit={onSubmit}
									action={url.loginAction}
									method="post">
									<div className={getClassName("kcFormGroupClass")}>
										{!usernameHidden &&
											(() => {
												const label = !realm.loginWithEmailAllowed
													? "username"
													: realm.registrationEmailAsUsername
														? "email"
														: "usernameOrEmail";

												const autoCompleteHelper: typeof label =
													label === "usernameOrEmail" ? "username" : label;

												return (
													<>
														<label
															htmlFor={autoCompleteHelper}
															className={getClassName("kcLabelClass")}>
															{msg(label)}
														</label>
														<input
															tabIndex={1}
															id={autoCompleteHelper}
															className={getClassName("kcInputClass")}
															//NOTE: This is used by Google Chrome auto fill so we use it to tell
															//the browser how to pre fill the form but before submit we put it back
															//to username because it is what keycloak expects.
															name={autoCompleteHelper}
															defaultValue={login.username ?? ""}
															type="text"
															autoFocus={true}
															autoComplete="off"
														/>
													</>
												);
											})()}
									</div>
									<div className={getClassName("kcFormGroupClass")}>
										<label
											htmlFor="password"
											className={getClassName("kcLabelClass")}>
											{msg("password")}
										</label>
										<input
											tabIndex={2}
											id="password"
											className={getClassName("kcInputClass")}
											name="password"
											type="password"
											autoComplete="off"
										/>
									</div>
									<div
										className={clsx(
											getClassName("kcFormGroupClass"),
											getClassName("kcFormSettingClass")
										)}>
										<div id="kc-form-options">
											{realm.rememberMe && !usernameHidden && (
												<div className="checkbox">
													<label>
														<input
															tabIndex={3}
															id="rememberMe"
															name="rememberMe"
															type="checkbox"
															{...(login.rememberMe === "on"
																? {
																		checked: true,
																	}
																: {})}
														/>
														{msg("rememberMe")}
													</label>
												</div>
											)}
										</div>
										<div className={getClassName("kcFormOptionsWrapperClass")}>
											{realm.resetPasswordAllowed && (
												<span>
													<a tabIndex={5} href={url.loginResetCredentialsUrl}>
														{msg("doForgotPassword")}
													</a>
												</span>
											)}
										</div>
									</div>
									<div
										id="kc-form-buttons"
										className={getClassName("kcFormGroupClass")}>
										<input
											type="hidden"
											id="id-hidden-input"
											name="credentialId"
											{...(auth?.selectedCredential !== undefined
												? {
														value: auth.selectedCredential,
													}
												: {})}
										/>
										<input
											tabIndex={4}
											className={clsx(
												getClassName("kcButtonClass"),
												getClassName("kcButtonPrimaryClass"),
												getClassName("kcButtonBlockClass"),
												getClassName("kcButtonLargeClass")
											)}
											name="login"
											id="kc-login"
											type="submit"
											value={msgStr("doLogIn")}
											disabled={isLoginButtonDisabled}
										/>
									</div>
								</form>
								<div>
									<div id="kc-info" className={getClassName("kcSignUpClass")}>
										<div
											id="kc-info-wrapper"
											className={getClassName("kcInfoAreaWrapperClass")}>
											{realm.password &&
												realm.registrationAllowed &&
												!registrationDisabled && (
													<div id="kc-registration">
														<span>
															{msg("noAccount")}
															<a
																className="font-bold"
																tabIndex={6}
																href={url.registrationUrl}>
																{msg("doRegister")}
															</a>
														</span>
													</div>
												)}
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</Template>
		</>
	);
}
