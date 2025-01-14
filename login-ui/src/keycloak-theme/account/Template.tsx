/** @format */

// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/account/TemplateProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import icon from "./assets/bookworm-icon.svg";

export default function Template(props: TemplateProps<KcContext, I18n>) {
	const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;

	const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

	const { msg } = i18n;

	const { url, features, realm, message, referrer } = kcContext;

	const { isReady } = usePrepareTemplate({
		doFetchDefaultThemeResources: doUseDefaultCss,
		styles: [
			`${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
			`${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
			`${url.resourcesPath}/css/account.css`,
		],
		htmlClassName: getClassName("kcHtmlClass"),
		bodyClassName: clsx("admin-console", "user", getClassName("kcBodyClass")),
	});

	if (!isReady) {
		return null;
	}

	return (
		<>
			<header className="navbar navbar-default navbar-pf navbar-main header">
				<nav className="navbar" role="navigation">
					<div className="navbar-header">
						<div className="container flex items-center">
							<div className="flex items-center h-full">
								<img className="navbar-icon" src={icon}></img>
								<h3 className="text-white inline-block my-0">Bookworm</h3>
							</div>
							<ul className="nav navbar-nav navbar-utility">
								{referrer?.url && (
									<li>
										<a href={referrer.url} id="referrer">
											{msg("backTo", referrer.name)}
										</a>
									</li>
								)}
								<li>
									<a href={url.getLogoutUrl()}>{msg("doSignOut")}</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="navbar-collapse navbar-collapse-1">
						<div className="container">
						
						</div>
					</div>
				</nav>
			</header>

			<div className="container">
				<div className="bs-sidebar col-sm-3">
					<ul>
						<li className={clsx(active === "account" && "active")}>
							<a href={url.accountUrl}>{msg("account")}</a>
						</li>
						{features.passwordUpdateSupported && (
							<li className={clsx(active === "password" && "active")}>
								<a href={url.passwordUrl}>{msg("password")}</a>
							</li>
						)}
						<li className={clsx(active === "totp" && "active")}>
							<a href={url.totpUrl}>{msg("authenticator")}</a>
						</li>
						{features.identityFederation && (
							<li className={clsx(active === "social" && "active")}>
								<a href={url.socialUrl}>{msg("federatedIdentity")}</a>
							</li>
						)}
						<li className={clsx(active === "sessions" && "active")}>
							<a href={url.sessionsUrl}>{msg("sessions")}</a>
						</li>
						<li className={clsx(active === "applications" && "active")}>
							<a href={url.applicationsUrl}>{msg("applications")}</a>
						</li>
						{features.log && (
							<li className={clsx(active === "log" && "active")}>
								<a href={url.logUrl}>{msg("log")}</a>
							</li>
						)}
						{realm.userManagedAccessAllowed && features.authorization && (
							<li className={clsx(active === "authorization" && "active")}>
								<a href={url.resourceUrl}>{msg("myResources")}</a>
							</li>
						)}
					</ul>
				</div>

				<div className="col-sm-9 content-area">
					{message !== undefined && (
						<div className={clsx("alert", `alert-${message.type}`)}>
							{message.type === "success" && (
								<span className="pficon pficon-ok"></span>
							)}
							{message.type === "error" && (
								<span className="pficon pficon-error-circle-o"></span>
							)}
							<span className="kc-feedback-text">{message.summary}</span>
						</div>
					)}

					{children}
				</div>
			</div>
		</>
	);
}
