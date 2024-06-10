import { useCallback } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Button,
  VStack,
  Container,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react"; // Import useContext hook from React
import { AuthContext } from "../../contexts/auth"; // Import your AuthGoogleContext
import { SearchInput } from "../Components/SearchInput";
import { MovieGrid } from "../Components/MovieGrid";
import { getMoviesTrending, getMovies, getTVSeries } from "../../api/Auth";

import Logo from "../../assets/logo.svg";
import HomeIcon from "../../assets/icon-nav-home.svg";
import MoviesIcon from "../../assets/icon-nav-movies.svg";
import TvSeriesIcon from "../../assets/icon-nav-tv-series.svg";
import BookmarkIcon from "../../assets/icon-nav-bookmark.svg";

export const Layout = ({ children, backgroundImage, isMoviePage }) => {
  const { signOut } = useContext(AuthContext); // Access signOut function from the context
  const handleLogout = () => {
    signOut(); // Call signOut function
  };

  return (
    <Box>
      <Flex>
        {isMoviePage && (
          <>
            <Box
              style={{
                backgroundImage: `url(${backgroundImage})`, // Use backgroundImage prop
                backgroundSize: "cover", // Cover the entire space
                backgroundRepeat: "no-repeat", // Do not repeat the image
                filter: "blur(10px)", // Add a blur filter
                position: "absolute",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100%",
                zIndex: "-1",
                opacity: 0.5, // Adjust the opacity as needed
                backgroundColor: "black",
              }}
            ></Box>

            <div
              style={{
                backgroundImage: `url(${backgroundImage})`, // Use backgroundImage prop
                backgroundSize: "cover", // Cover the entire space
                backgroundRepeat: "no-repeat", // Do not repeat the image
                filter: "blur(10px)", // Add a blur filter
                position: "absolute",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100%",
                zIndex: "-1",
                opacity: 0.5, // Adjust the opacity as needed
                backgroundColor: "black",
              }}
            ></div>
          </>
        )}
        <VStack
          as="nav"
          bg="gray.200"
          p={2}
          width="96px"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          height={"90vh"}
          borderRadius={"20px"}
          m={6}
          backgroundColor="var(--semi-dark-blue)"
          className="hello3"
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={6}
            alignItems={"center"}
          >
            <Image src={Logo} alt="Logo" mt={6} mb={12} />
            <Link to="/">
              <Image src={HomeIcon} alt="home" />
            </Link>
            <Link to="/Movies">
              <Image src={MoviesIcon} alt="movies" />
            </Link>
            <Link to="/Tvseries">
              <Image src={TvSeriesIcon} alt="tvseries" />
            </Link>
            <Link to="/Bookmark">
              <Image src={BookmarkIcon} alt="bookmark" />
            </Link>
          </Box>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              mb={6}
            >
              <Avatar size={"sm"} />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </VStack>
        <Box flex="1" overflowY="auto">
          {children}
        </Box>
      </Flex>
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
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  const filteredTvSeries = useCallback(() => {
    return tvSeries.filter((series) =>
      series.original_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tvSeries, searchTerm]);

  const filteredTrending = useCallback(() => {
    return trending.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
