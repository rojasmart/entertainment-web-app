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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react"; // Import useContext hook from React
import { AuthContext } from "../../contexts/auth"; // Import your AuthGoogleContext
import { SearchInput } from "../Components/SearchInput";
import { MovieGrid } from "../Components/MovieGrid";
import { getMoviesTrending, getMovies, getTVSeries } from "../../api/Auth";

export const Layout = ({ children, backgroundImage }) => {
  const { signOut } = useContext(AuthContext); // Access signOut function from the context
  const handleLogout = () => {
    signOut(); // Call signOut function
  };
  return (
    <Box>
      <Flex className={"hello2"}>
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
        <VStack
          as="nav"
          bg="gray.200"
          p={2}
          width="150px"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          height={"90vh"}
          borderRadius={"md"}
          m={6}
          backgroundColor="var(--semi-dark-blue)"
          className="hello3"
        >
          <Box display={"flex"} flexDirection={"column"} gap={6}>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/Movies">
              <Button>Movies</Button>
            </Link>
            <Link to="/Tvseries">
              <Button>TV Series</Button>
            </Link>
            <Link to="/Bookmarks">
              <Button>Bookmarks</Button>
            </Link>
          </Box>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
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
        <Box flex="1" className={"hello4"} overflowY="auto">
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTvSeries = tvSeries.filter((series) =>
    series.original_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTrending = trending.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Container maxW={"100%"} className="hello">
        <SearchInput onSearch={handleSearch} />
        <MovieGrid
          text="Recommended for you"
          textScroll="Trending"
          trending={filteredTrending}
          movies={filteredMovies}
          tvSeries={filteredTvSeries}
          useScrollContainer={true}
        />
      </Container>
    </Layout>
  );
};
