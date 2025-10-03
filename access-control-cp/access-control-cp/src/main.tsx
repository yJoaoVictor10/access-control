import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './Error/index.tsx'
import Cadastro from './Cadastro/index.tsx'
import './globals.css'
import Login from './Login/index.tsx'
import App from './App.tsx'

const router = createBrowserRouter([{
  path:"/", element:<App/>, errorElement: <Error/>, children:[
    {path:"/", element:<Login/>},
    {path:"/cadastro", element:<Cadastro/>}
  ]
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
