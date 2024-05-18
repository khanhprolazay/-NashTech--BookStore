import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import LoginLogo from "../../components/logo/login.logo";

export default function LoginResetPassword(
	props: PageProps<
		Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
		I18n
	>
) {
	const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

	const { getClassName } = useGetClassName({
		doUseDefaultCss,
		classes,
	});

	const { url, realm, auth } = kcContext;
	const { msg, msgStr } = i18n;

	return (
		<Template
			{...{ kcContext, i18n, doUseDefaultCss, classes }}
			displayMessage={false}
			// contentWrapperStyles={{ height: "auto", maxWidth: "36rem" }}
			// cardStyles={{ minWidth: "40rem" }}
			displayWide={true}
			headerAlign="left"
			// cardStyles={{ minWidth: "68rem" }}
			imageNode={<LoginLogo />}
			headerNode={
				<>
					<h1 style={{ textAlign: "left" }}>Forgot your password?</h1>
					<p>
						Enter your email address to reset your password. We'll send you an
						email with a link to change your password
					</p>
				</>
			}
			infoNode={msg("emailInstruction")}>
			<div id="kc-form-wrapper">
				<form
					id="kc-reset-password-form"
					// style={{ minWidth: "36rem" }}
					className={getClassName("kcFormClass")}
					action={url.loginAction}
					method="post">
					<div className={getClassName("kcFormGroupClass")}>
						<div className={getClassName("kcLabelWrapperClass")}>
							<label
								htmlFor="username"
								className={getClassName("kcLabelClass")}>
								{!realm.loginWithEmailAllowed
									? msg("username")
									: !realm.registrationEmailAsUsername
										? msg("usernameOrEmail")
										: msg("email")}
							</label>
						</div>
						<div className={getClassName("kcInputWrapperClass")}>
							<input
								type="text"
								id="username"
								name="username"
								className={getClassName("kcInputClass")}
								autoFocus
								defaultValue={
									auth !== undefined && auth.showUsername
										? auth.attemptedUsername
										: undefined
								}
							/>
						</div>
					</div>
					<div
						className={clsx(
							getClassName("kcFormGroupClass"),
							getClassName("kcFormSettingClass")
						)}>
						<div
							id="kc-form-options"
							className={getClassName("kcFormOptionsClass")}>
							<div className={getClassName("kcFormOptionsWrapperClass")}>
								<span>
									<a href={url.loginUrl}>{msg("backToLogin")}</a>
								</span>
							</div>
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
								value={msgStr("doSubmit")}
							/>
						</div>
					</div>
				</form>
			</div>
		</Template>
	);
}
