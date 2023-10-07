import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CurrentUserContextProvider } from "./hooks/useCurrentUser/context";

const serverUri = import.meta.env.VITE_SERVER_URL;

if (!serverUri) throw new Error("VITE_SERVER_URL is not defined");

const client = new ApolloClient({
	uri: serverUri,
	cache: new InMemoryCache(),
	credentials: "include",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<CurrentUserContextProvider>
				<RouterProvider router={router} />
			</CurrentUserContextProvider>
		</ApolloProvider>
	</React.StrictMode>,
);
