import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default AppRoutes;
