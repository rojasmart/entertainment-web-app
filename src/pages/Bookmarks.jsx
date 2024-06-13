import { useContext, useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";

import { AuthContext } from "../contexts/auth";

import { getMovies } from "../api/Auth";

export const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  const { fetchBookmarks } = useContext(AuthContext);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const fetchedBookmarks = await fetchBookmarks();
      const fetchedMovies = await getMovies();

      setBookmarks(fetchedBookmarks);
      setMovies(fetchedMovies.results);

      const bookmarkIds = fetchedBookmarks.map((bookmark) => bookmark.id);
      const filteredMovies = fetchedMovies.results.filter((movie) =>
        bookmarkIds.includes(movie.id)
      );

      setBookmarkedMovies(filteredMovies);
    };

    fetchAndSetData();
  }, [fetchBookmarks]);

  return (
    <Layout isMoviePage={false}>
      <Container maxW={"100%"}>
        <SearchInput />
        <MovieGrid
          text="Bookmarks"
          movies={bookmarkedMovies}
          useScrollContainer={false}
        />
      </Container>
    </Layout>
  );
};
