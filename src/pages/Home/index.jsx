import { useCallback } from "react";
import { Box, Flex, Menu, MenuButton, Avatar, MenuList, MenuItem, Button, Stack, Container, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { SearchInput } from "../Components/SearchInput";
import { MovieGrid } from "../Components/MovieGrid";
import { getMoviesTrending, getMovies, getTVSeries } from "../../api/Auth";

import Logo from "../../assets/logo.svg";
import HomeIcon from "../../assets/icon-nav-home.svg";
import MoviesIcon from "../../assets/icon-nav-movies.svg";
import TvSeriesIcon from "../../assets/icon-nav-tv-series.svg";
import BookmarkIcon from "../../assets/icon-nav-bookmark.svg";

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

// NavLink component with active state and hover effect
const NavLink = ({ to, icon, alt }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link to={to}>
      <Box
        position="relative"
        p={2}
        borderRadius="md"
        transition="all 0.2s"
        _hover={{
          transform: "scale(1.1)",
          filter: "brightness(1.2)",
        }}
        sx={{
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: isActive ? "100%" : "0%",
            height: "3px",
            bg: "var(--primary-red)",
            transition: "width 0.3s ease",
            borderRadius: "2px",
          },
        }}
      >
        <Image src={icon} alt={alt} filter={isActive ? "brightness(1.5)" : "brightness(1)"} />
        {isActive && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderRadius="md"
            boxShadow={`0 0 10px 2px var(--primary-red)`}
            opacity="0.4"
            pointerEvents="none"
          />
        )}
      </Box>
    </Link>
  );
};

export const Layout = ({ children, backgroundImage, isMoviePage }) => {
  const { signOut } = useContext(AuthContext);
  const handleLogout = () => {
    signOut();
  };

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
          <Stack
            as="nav"
            direction={{ base: "row", md: "column" }}
            bg="gray.200"
            p={2}
            width={{ base: "full", md: "96px" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            height={{ base: "80px", md: "90vh" }}
            borderRadius={"20px"}
            m={6}
            backgroundColor="var(--semi-dark-blue)"
            overflowX="auto"
          >
            <Box display={"flex"} flexDirection={{ base: "row", md: "column" }} gap={6} alignItems={"center"}>
              <Image src={Logo} alt="Logo" mt={{ base: 0, md: 6 }} mb={{ base: 0, md: 12 }} />
              <NavLink to="/" icon={HomeIcon} alt="home" />
              <NavLink to="/Movies" icon={MoviesIcon} alt="movies" />
              <NavLink to="/Tvseries" icon={TvSeriesIcon} alt="tvseries" />
              <NavLink to="/Bookmarks" icon={BookmarkIcon} alt="bookmark" />
            </Box>
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} mb={{ base: 0, md: 6 }}>
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
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
          <Stack
            as="nav"
            direction={{ base: "row", md: "column" }}
            bg="gray.200"
            p={4}
            width={{ base: "auto", md: "96px" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            height={{ base: "80px", md: "90vh" }}
            borderRadius={"20px"}
            m={6}
            backgroundColor="var(--semi-dark-blue)"
            overflowX="auto"
          >
            <Box display={"flex"} flexDirection={{ base: "row", md: "column" }} gap={6} alignItems={"center"}>
              <Image src={Logo} alt="Logo" mt={{ base: 0, md: 6 }} mb={{ base: 0, md: 12 }} />
              <NavLink to="/" icon={HomeIcon} alt="home" />
              <NavLink to="/Movies" icon={MoviesIcon} alt="movies" />
              <NavLink to="/Tvseries" icon={TvSeriesIcon} alt="tvseries" />
              <NavLink to="/Bookmarks" icon={BookmarkIcon} alt="bookmark" />
            </Box>
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} mb={{ base: 0, md: 6 }}>
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
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
