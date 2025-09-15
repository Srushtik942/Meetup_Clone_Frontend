import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import EventDetails from './components/EventDetails.jsx'
import EventSearch from './components/EventSearch.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/eventDetails/:eventId",
    element:<EventDetails/>
  },
    { path: "/search", element: <EventSearch /> }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
