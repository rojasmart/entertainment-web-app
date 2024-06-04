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

export const Layout = ({ children }) => {
  const { signOut } = useContext(AuthContext); // Access signOut function from the context
  const handleLogout = () => {
    signOut(); // Call signOut function
  };
  return (
    <Flex>
      <VStack
        as="nav"
        bg="gray.200"
        p={4}
        width="200px"
        justifyContent="start"
        alignItems="start"
        spacing={4}
      >
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
      <Box flex="1" overflowY="auto">
        {children}
      </Box>
    </Flex>
  );
};

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getMovies().then((data) => setMovies(data.results));
    getTVSeries().then((data) => setTvSeries(data.results));
    getMoviesTrending().then((data) => setTrending(data.results));
    //getMoviesPopular().then((data) => setMovies(data.results));
  }, []);

  console.log("movies", movies);
  console.log("tvSeries", tvSeries);

  return (
    <Layout>
      <Container maxW={"100%"}>
        <SearchInput />
        <MovieGrid
          text="Recommended for you"
          textScroll="Trending"
          trending={trending}
          movies={movies}
          tvSeries={tvSeries}
          useScrollContainer={true}
        />
      </Container>
    </Layout>
  );
};
