import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import CreateForm from '@/pages/CreateForm.tsx';
import { ThemeProvider } from '@/context/ThemeContext.tsx';
import ReduxProvider from '@/components/providers/ReduxProvider.tsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/create-form",
        element: <CreateForm />,
      },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
        {/* <ReduxProvider> */}
            <RouterProvider router={router} />
        {/* </ReduxProvider> */}
    </ThemeProvider>
  </React.StrictMode>,
)
