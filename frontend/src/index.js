import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"


import Editor from './components/Editor';
import SignIN from './components/SignIn';
import SignUP from './components/SignUp';
import UserDashBoard from './components/UserDashboard';
import RedirectToDocs from "./components/Redirect"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToDocs></RedirectToDocs>
  },
  {
    path: "/signin",
    element: <SignIN></SignIN>
  },{
    path: "/signup",
    element: <SignUP></SignUP>
  },
  {
    path:"/dashboard",
    element: <UserDashBoard></UserDashBoard>
  },
  {
    path: "/document/:ID",
    element: <Editor></Editor>
  },

])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

