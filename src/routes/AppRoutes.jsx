import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
//import { PrivateRoutes } from "./PrivateRoutes";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*  <Route path="/Home" element={<PrivateRoutes />}>
          <Route path="/Home" element={<Home />} />
        </Route> */}
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
