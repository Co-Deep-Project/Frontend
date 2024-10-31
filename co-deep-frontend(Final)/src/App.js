import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gahyun from "./gahyun/Gahyun";
import Yunji from "./yunji/Yunji";
import Seoin from "./seoin/Seoin";
import Home from "./Home";

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
