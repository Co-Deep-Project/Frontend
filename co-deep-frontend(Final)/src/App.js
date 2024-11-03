import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Desktop from "./gahyun/Desktop";
import Yunji from "./yunji/yunji";
import Seoin from "./seoin/seoin";
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
