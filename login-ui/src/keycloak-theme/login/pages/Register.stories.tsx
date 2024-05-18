import type { Meta } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const pageId = "register.ftl";

const { PageStory } = createPageStory({ pageId });

const meta = {
	title: "login/register.ftl",
	component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;

export const Default = () => (
	<PageStory
		kcContext={{
			message: {
				type: "warning",
				summary: "You need to change your password to activate your account.",
			},
		}}
	/>
);
