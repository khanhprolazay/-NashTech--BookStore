import type { Meta } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const pageId = "error.ftl";

const { PageStory } = createPageStory({ pageId });

const meta = {
	title: "login/error.ftl",
	component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;

export const Default = () => <PageStory />;
