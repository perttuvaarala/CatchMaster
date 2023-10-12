import dotenv from "dotenv";
dotenv.config();

type TEnvEntry<T> = readonly [key: T, value: string | undefined];

const readEnvVariable = <T extends string>(key: T): TEnvEntry<T> =>
	[key, process.env[key]] as const;

const checkErrors = <T>(entries: TEnvEntry<T>[]) => {
	const missingKeys = entries
		.filter(([_key, value]) => !value)
		.map(([key]) => key);

	if (missingKeys.length > 0) {
		throw new Error(
			`Missing environment variables: ${missingKeys.join(", ")}`,
		);
	}
};

const parseEnv = <T extends string>(keys: T[]) => {
	const entries = keys.map(readEnvVariable);
	checkErrors(entries);
	return Object.fromEntries(entries) as Record<T, string>;
};

export const config={... parseEnv([
	"DATABASE_URL",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET",
	"GOOGLE_CALLBACK_URL",
	"APP_URL",
	"SESSION_SECRET",
	"SESSION_COOKIE_NAME",
]), PORT: process.env.PORT || "3000"};
