import type { Meta } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const pageId = "register-user-profile.ftl";

const { PageStory } = createPageStory({ pageId });

const meta = {
	title: "login/register-user-profile.ftl",
	component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;

export const Default = () => <PageStory />;
