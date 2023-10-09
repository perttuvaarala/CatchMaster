import { createBrowserRouter } from "react-router-dom";
import Root from "./views/Root";
import Main from "./views/mainView";
import Map from "./views/mapView";
import Weather from "./views/weatherView";
import Profile from "./views/profileView";
import NewPost from "./views/NewPostView";
import NewBait from "./views/newBait";
import About from "./components/About";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ path: "", element: <Main /> },
			{
				path: "map",
				element: <Map />,
			},
			{
				path: "weather",
				element: <Weather />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "newpost",
				element: <NewPost />,
			},
			{
				path: "newbait",
				element: <NewBait />,
			},
			{
				path: "about",
				element: <About />,
			},
		],
	},
]);
