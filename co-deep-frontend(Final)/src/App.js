import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gahyun from "./gahyun/gahyun";
import Yunji from "./yunji/yunji";
import Home from "./Home";
import Seoin from "./seoin/Seoin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "gahyun",
    element: <Gahyun />,
  },
  {
    path: "yunji",
    element: <Yunji />,
  },
  {
    path: "seoin",
    element: <Seoin />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
