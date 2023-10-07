import { useContext } from "react";
import { CurrentUserContext } from "./context";

export const useCurrentUser = () => {
	const currentUser = useContext(CurrentUserContext);
	return currentUser;
};
