import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

type Tag = {
	slug: string;
	name: string;
};

export default async function RulesHome() {
	// Read tags.yaml to get the first tag
	const tagsYamlPath = path.join(process.cwd(), "rules", "tags.yaml");
	const tagsYamlContent = fs.readFileSync(tagsYamlPath, "utf8");
	const tagsList = yaml.load(tagsYamlContent) as Tag[];

	// Get the first tag, or default to 'react' if no tags exist
	const firstTag = tagsList.length > 0 ? tagsList[0].slug : "react";

	// Redirect to the first tag's page
	redirect(`/rules/${firstTag}`);
}
