import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Movies } from "../pages/Movies";
import { MoviePage } from "../pages/MoviePage";
import { TvSeries } from "../pages/TvSeries";
import { Bookmarks } from "../pages/Bookmarks";
import { PrivateRoutes } from "./PrivateRoutes";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PrivateRoutes />}>
          <Route path="Home" element={<Home />} />
          <Route path="Movies" element={<Movies />} />
          <Route path="Movies/:id" element={<MoviePage />} />
          <Route path="Tvseries" element={<TvSeries />} />
          <Route path="Bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
