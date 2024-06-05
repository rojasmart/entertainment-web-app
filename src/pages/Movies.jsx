import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";
import { getMovies } from "../api/Auth";

export const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((data) => setMovies(data.results));
    //getMoviesPopular().then((data) => setMovies(data.results));
  }, []);

  return (
    <Layout>
      <Container maxW={"100%"}>
        <SearchInput />
        <MovieGrid text="Movies" useScrollContainer={false} movies={movies} />
      </Container>
    </Layout>
  );
};
