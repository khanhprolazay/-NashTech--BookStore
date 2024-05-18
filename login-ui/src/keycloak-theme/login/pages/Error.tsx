import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Error(
	props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>
) {
	const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

	const { message } = kcContext;

	// const { msg } = i18n;

	return (
		<Template
			{...{ kcContext, i18n, doUseDefaultCss, classes }}
			displayMessage={false}
            headerNode={false}
            showHeader={false}
            displayInfo={false}
			// headerNode={msg("errorTitle")}
            >
			<div id="kc-error-message">
				{/* <p className="instruction">{message.summary}</p>
                {client !== undefined && client.baseUrl !== undefined && (
                    <p>
                        <a id="backToApplication" href={client.baseUrl}>
                            {msg("backToApplication")}
                        </a>
                    </p>
                )} */}
				<div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
					<div className="rounded-lg bg-white p-8 text-center shadow-xl">
						<h1 className="mb-4 text-4xl font-bold">We Are Sorry</h1>
						<p className="text-gray-600">
							{message.summary}
						</p>
						<a
							href="https://obis.bagiit.vn"
							className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 hover:!text-slate-200">
							Go back to Home
						</a>
					</div>
				</div>
			</div>
		</Template>
	);
}
