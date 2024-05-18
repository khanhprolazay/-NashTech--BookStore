import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import React from "react";
import TermAndConditionPopup, {
	PopupHandle,
} from "../../components/popup/term-and-condition.popup";
import LoginLogo from "../../components/logo/login.logo";

export default function Register(
	props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
	const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
	const popupRef = React.useRef<PopupHandle>(null);

	const { getClassName } = useGetClassName({
		doUseDefaultCss,
		classes,
	});

	const {
		url,
		messagesPerField,
		register,
		realm,
		passwordRequired,
		recaptchaRequired,
		recaptchaSiteKey,
	} = kcContext;

	const { msg, msgStr } = i18n;
	const open = () => popupRef.current?.open();

	return (
		<>
			<TermAndConditionPopup ref={popupRef} />
			<Template
				{...{ kcContext, i18n, doUseDefaultCss, classes }}
				headerNode={msg("registerTitle")}
				displayWide={true}
				// cardStyles={{ minWidth: "60rem" }}
				cardSize="large"
				imageNode={<LoginLogo />}>
				<div id="kc-form-wrapper">
					<form
						id="kc-register-form"
						// style={{ width: "38rem" }}
						className={getClassName("kcFormClass")}
						action={url.registrationAction}
						method="post"
						onSubmit={(event) => {
							const terms = document.getElementById(
								"terms"
							) as HTMLInputElement;
							if (!terms.checked) {
								event.preventDefault();
								alert(
									"By signing up, you must accept our terms and conditions!"
								);
								return false;
							}
						}}>
						<div
							className={clsx(
								getClassName("kcFormGroupClass"),
								messagesPerField.printIfExists(
									"firstName",
									getClassName("kcFormGroupErrorClass")
								)
							)}>
							<div className={getClassName("kcLabelWrapperClass")}>
								<label
									htmlFor="firstName"
									className={getClassName("kcLabelClass")}>
									{msg("firstName")}
								</label>
							</div>
							<div className={getClassName("kcInputWrapperClass")}>
								<input
									type="text"
									id="firstName"
									className={getClassName("kcInputClass")}
									name="firstName"
									defaultValue={register.formData.firstName ?? ""}
								/>
							</div>
						</div>

						<div
							className={clsx(
								getClassName("kcFormGroupClass"),
								messagesPerField.printIfExists(
									"lastName",
									getClassName("kcFormGroupErrorClass")
								)
							)}>
							<div className={getClassName("kcLabelWrapperClass")}>
								<label
									htmlFor="lastName"
									className={getClassName("kcLabelClass")}>
									{msg("lastName")}
								</label>
							</div>
							<div className={getClassName("kcInputWrapperClass")}>
								<input
									type="text"
									id="lastName"
									className={getClassName("kcInputClass")}
									name="lastName"
									defaultValue={register.formData.lastName ?? ""}
								/>
							</div>
						</div>

						<div
							className={clsx(
								getClassName("kcFormGroupClass"),
								messagesPerField.printIfExists(
									"email",
									getClassName("kcFormGroupErrorClass")
								)
							)}>
							<div className={getClassName("kcLabelWrapperClass")}>
								<label htmlFor="email" className={getClassName("kcLabelClass")}>
									{msg("email")}
								</label>
							</div>
							<div className={getClassName("kcInputWrapperClass")}>
								<input
									type="text"
									id="email"
									className={getClassName("kcInputClass")}
									name="email"
									defaultValue={register.formData.email ?? ""}
									autoComplete="email"
								/>
							</div>
						</div>
						{!realm.registrationEmailAsUsername && (
							<div
								className={clsx(
									getClassName("kcFormGroupClass"),
									messagesPerField.printIfExists(
										"username",
										getClassName("kcFormGroupErrorClass")
									)
								)}>
								<div className={getClassName("kcLabelWrapperClass")}>
									<label
										htmlFor="username"
										className={getClassName("kcLabelClass")}>
										{msg("username")}
									</label>
								</div>
								<div className={getClassName("kcInputWrapperClass")}>
									<input
										type="text"
										id="username"
										className={getClassName("kcInputClass")}
										name="username"
										defaultValue={register.formData.username ?? ""}
										autoComplete="username"
									/>
								</div>
							</div>
						)}
						{passwordRequired && (
							<>
								<div
									className={clsx(
										getClassName("kcFormGroupClass"),
										messagesPerField.printIfExists(
											"password",
											getClassName("kcFormGroupErrorClass")
										)
									)}>
									<div className={getClassName("kcLabelWrapperClass")}>
										<label
											htmlFor="password"
											className={getClassName("kcLabelClass")}>
											{msg("password")}
										</label>
									</div>
									<div className={getClassName("kcInputWrapperClass")}>
										<input
											type="password"
											id="password"
											className={getClassName("kcInputClass")}
											name="password"
											autoComplete="new-password"
										/>
									</div>
								</div>

								<div
									className={clsx(
										getClassName("kcFormGroupClass"),
										messagesPerField.printIfExists(
											"password-confirm",
											getClassName("kcFormGroupErrorClass")
										)
									)}>
									<div className={getClassName("kcLabelWrapperClass")}>
										<label
											htmlFor="password-confirm"
											className={getClassName("kcLabelClass")}>
											{msg("passwordConfirm")}
										</label>
									</div>
									<div className={getClassName("kcInputWrapperClass")}>
										<input
											type="password"
											id="password-confirm"
											className={getClassName("kcInputClass")}
											name="password-confirm"
										/>
									</div>
								</div>
							</>
						)}
						{recaptchaRequired && (
							<div className="form-group">
								<div className={getClassName("kcInputWrapperClass")}>
									<div
										className="g-recaptcha"
										data-size="compact"
										data-sitekey={recaptchaSiteKey}></div>
								</div>
							</div>
						)}
						<div
							className={getClassName("kcFormGroupClass")}
							style={{ marginBottom: "24px" }}>
							<div className="form-agree-term">
								<input id="terms" type="checkbox" name="terms" />
								<label htmlFor="terms" style={{ display: "inline" }}>
									I understand and agree with the&nbsp;
								</label>
								<span className="form-link" onClick={open}>
									Terms and Conditions.
								</span>
							</div>

							<div
								id="kc-form-buttons"
								className={getClassName("kcFormButtonsClass")}>
								<input
									className={clsx(
										getClassName("kcButtonClass"),
										getClassName("kcButtonPrimaryClass"),
										getClassName("kcButtonBlockClass"),
										getClassName("kcButtonLargeClass")
									)}
									type="submit"
									value={msgStr("doRegister")}
								/>
							</div>

							<div
								id="kc-form-options"
								style={{ marginTop: "16px" }}
								className={getClassName("kcFormOptionsClass")}>
								<div className={getClassName("kcFormOptionsWrapperClass")}>
									<span>
										<a href={url.loginUrl}>{msg("backToLogin")}</a>
									</span>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Template>
		</>
	);
}
