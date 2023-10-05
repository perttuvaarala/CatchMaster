import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: [
		"../server/src/api/schema/bait.graphql",
		"../server/src/api/schema/fish.graphql",
		"../server/src/api/schema/post.graphql",
		"../server/src/api/schema/user.graphql",
	],
	documents: "src/**/*.graphql",
	generates: {
		"src/types.ts": {
			plugins: ["typescript"],
		},
		"src/": {
			preset: "near-operation-file",
			presetConfig: {
				extension: ".generated.tsx",
				baseTypesPath: "types.ts",
			},
			plugins: ["typescript-operations", "typescript-react-apollo"],
			config: {
				scalars: {
					Date: "Date",
				},
			},
		},
	},
};

export default config;
