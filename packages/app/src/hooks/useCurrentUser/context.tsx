import { FC, ReactNode, createContext } from "react";
import {
	CurrentUserFragment,
	useCurrentUserQuery,
} from "./graphql/CurrentUser.generated";

export const CurrentUserContext = createContext<CurrentUserFragment | null>(
	null,
);

type CurrentUserContextProviderProps = { children?: ReactNode };

export const CurrentUserContextProvider: FC<
	CurrentUserContextProviderProps
> = ({ children }) => {
	const { data } = useCurrentUserQuery();

	const currentUser = data?.currentUser || null;

	return (
		<CurrentUserContext.Provider value={currentUser}>
			{children}
		</CurrentUserContext.Provider>
	);
};
