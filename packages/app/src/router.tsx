import {createBrowserRouter} from 'react-router-dom'
import Root from './views/Root'
import Main from './views/mainView'
import Map from './views/mapView'
import Weather from './views/weatherView'
import Profile from './views/profileView'

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
    ]
  }
])