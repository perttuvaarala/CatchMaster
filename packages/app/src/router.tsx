import {createBrowserRouter} from 'react-router-dom'
import Root from './views/Root'
import Main from './views/mainView'
import Map from './views/mapView'
import Weather from './views/weatherView'
import Profile from './views/profileView'
import NewPost from './views/NewPostView'
import About from './components/About'

export const router = createBrowserRouter([{
  path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Main /> },
      {
        path: 'map',
        element: <Map />
      },
      {
        path: 'weather',
        element: <Weather />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'NewPost',
        element: <NewPost />
      },
      {
        path: 'about',
        element: <About />
      },
    ]
  }
])