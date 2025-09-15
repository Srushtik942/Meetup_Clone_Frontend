import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import EventDetails from './components/EventDetails.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/eventDetails/:eventId",
    element:<EventDetails/>
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
