import {createBrowserRouter} from 'react-router-dom'
import Root from './views/Root'
import Main from './views/Main'
import Map from './views/Map'
export const router = createBrowserRouter([{
  path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Main /> },
      {
        path: 'map',
        element: <Map />
      },
    ]
  }

])