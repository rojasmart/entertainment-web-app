import { useCallback, useContext, useEffect, useState } from "react";
import { Container, filter } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";

import { AuthContext } from "../contexts/auth";

import { getMovies } from "../api/Auth";
import { getTVSeries } from "../api/Auth";
import { set } from "firebase/database";

export const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedSeries, setBookmarkedSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const { fetchBookmarks } = useContext(AuthContext);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const fetchedBookmarks = await fetchBookmarks();
      const fetchedMovies = await getMovies();
      const fetchedSeries = await getTVSeries();

      setBookmarks(fetchedBookmarks);
      setMovies(fetchedMovies.results);
      setSeries(fetchedSeries.results);

      const bookmarkIds = fetchedBookmarks.map((bookmark) => bookmark.id);
      const filteredMovies = fetchedMovies.results.filter((movie) =>
        bookmarkIds.includes(movie.id)
      );

      const filteredSeries = fetchedSeries.results.filter((serie) =>
        bookmarkIds.includes(serie.id)
      );

      setBookmarkedMovies(filteredMovies);
      setBookmarkedSeries(filteredSeries);
    };

    fetchAndSetData();
  }, [fetchBookmarks]);

  const filteredMovies = useCallback(() => {
    return bookmarkedMovies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );
  }, [bookmarkedMovies, searchTerm]);

  const filteredSeries = useCallback(() => {
    return bookmarkedSeries.filter((serie) =>
      serie.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );
  }, [bookmarkedSeries, searchTerm]);

  return (
    <Layout isMoviePage={false}>
      <Container maxW={"100%"}>
        <SearchInput onSearch={handleSearch} />
        <MovieGrid
          text="Bookmarks"
          movies={filteredMovies()}
          tvSeries={filteredSeries()}
          useScrollContainer={false}
          isBookmarked={true}
        />
      </Container>
    </Layout>
  );
};
