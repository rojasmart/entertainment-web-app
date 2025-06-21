import { useCallback } from "react";
import { Box, Flex, Menu, MenuButton, Avatar, MenuList, MenuItem, Button, Stack, Container, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { SearchInput } from "../Components/SearchInput";
import { MovieGrid } from "../Components/MovieGrid";
import { getMoviesTrending, getMovies, getTVSeries } from "../../api/Auth";

import SidebarNav from "../Components/SidebarNav";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

export const Layout = ({ children, backgroundImage, isMoviePage }) => {
  const { signOut, user } = useContext(AuthContext);
  const handleLogout = () => {
    signOut();
  };

  const boxBg = useColorModeValue("gray.100", "var(--semi-dark-blue)");

  const isMobile = useIsMobile();

  return (
    <Box>
      {!isMobile && (
        <Flex>
          {isMoviePage && (
            <>
              <Box
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(10px)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100vh",
                  width: "100%",
                  zIndex: "-1",
                  opacity: 0.5,
                  backgroundColor: "black",
                }}
              ></Box>

              <div
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(10px)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100vh",
                  width: "100%",
                  zIndex: "-1",
                  opacity: 0.5,
                  backgroundColor: "black",
                }}
              ></div>
            </>
          )}
          <SidebarNav user={user} handleLogout={handleLogout} boxBg={boxBg} />
          <Box flex="1" overflowY="auto">
            {children}
          </Box>
        </Flex>
      )}
      {isMobile && (
        <>
          {isMoviePage && (
            <>
              <Box
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(10px)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100vh",
                  width: "100%",
                  zIndex: "-1",
                  opacity: 0.5,
                  backgroundColor: "black",
                }}
              ></Box>

              <div
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(10px)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100vh",
                  width: "100%",
                  zIndex: "-1",
                  opacity: 0.5,
                  backgroundColor: "black",
                }}
              ></div>
            </>
          )}
          <SidebarNav user={user} handleLogout={handleLogout} boxBg={boxBg} />
          <Box flex="1" overflowY="auto">
            {children}
          </Box>
        </>
      )}
    </Box>
  );
};

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [trending, setTrending] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    getMovies().then((data) => setMovies(data.results));
    getTVSeries().then((data) => setTvSeries(data.results));
    getMoviesTrending().then((data) => setTrending(data.results));
    //getMoviesPopular().then((data) => setMovies(data.results));
  }, []);

  const filteredMovies = useCallback(() => {
    return movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [movies, searchTerm]);

  const filteredTvSeries = useCallback(() => {
    return tvSeries.filter((series) => series.original_name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tvSeries, searchTerm]);

  const filteredTrending = useCallback(() => {
    return trending.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [trending, searchTerm]);

  return (
    <Layout isMoviePage={false}>
      <Container maxW={"100%"}>
        <SearchInput onSearch={handleSearch} />
        <MovieGrid
          text="Recommended for you"
          textScroll="Trending"
          trending={filteredTrending()}
          movies={filteredMovies()}
          tvSeries={filteredTvSeries()}
          useScrollContainer={true}
        />
      </Container>
    </Layout>
  );
};
