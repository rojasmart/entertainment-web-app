import { useContext, useEffect, useState, useCallback } from "react";
import { Box, Flex, Container, useColorModeValue } from "@chakra-ui/react";
import { AuthContext } from "../../contexts/auth";
import { SearchInput } from "../Components/SearchInput";
import { MovieGrid } from "../Components/MovieGrid";
import { getMoviesTrending, getMovies, getTVSeries } from "../../api/Auth";

import SidebarNav from "../Components/SidebarNav";
import BlurredBackground from "../Components/BlurredBackground";

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
          {isMoviePage && <BlurredBackground backgroundImage={backgroundImage} />}
          <SidebarNav user={user} handleLogout={handleLogout} boxBg={boxBg} />
          <Box flex="1" overflowY="auto">
            {children}
          </Box>
        </Flex>
      )}
      {isMobile && (
        <>
          {isMoviePage && <BlurredBackground backgroundImage={backgroundImage} />}
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
