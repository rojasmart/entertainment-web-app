import { useCallback, useContext, useEffect, useState } from "react";
import { Container, Text, Spinner, Center, useToast } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";

import { AuthContext } from "../contexts/auth";

import { getMovies, getTVSeries } from "../api/Auth";

export const Bookmarks = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedSeries, setBookmarkedSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const { bookmarks, toggleBookmark, bookmarksLoaded } = useContext(AuthContext);

  useEffect(() => {
    const fetchMoviesAndSeries = async () => {
      try {
        setIsLoading(true);

        // Only fetch movies and TV series data once
        const [fetchedMovies, fetchedSeries] = await Promise.all([getMovies(), getTVSeries()]);

        setMovies(fetchedMovies.results || []);
        setSeries(fetchedSeries.results || []);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load content. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchMoviesAndSeries();
  }, []);

  // Update bookmarked content whenever bookmarks change
  useEffect(() => {
    if (bookmarksLoaded && movies.length > 0 && series.length > 0) {
      const bookmarkIds = new Set(bookmarks.map((bookmark) => bookmark.id));

      const filteredMovies = movies.filter((movie) => bookmarkIds.has(movie.id));
      const filteredSeries = series.filter((serie) => bookmarkIds.has(serie.id));

      setBookmarkedMovies(filteredMovies);
      setBookmarkedSeries(filteredSeries);
    }
  }, [bookmarks, bookmarksLoaded, movies, series]);

  const handleToggleBookmark = useCallback(
    async (item) => {
      try {
        const title = item.title || item.name || item.original_name;
        const isCurrentlyBookmarked = bookmarks?.some((bookmark) => bookmark.id === item.id);

        await toggleBookmark(item);

        // Show toast based on the action performed
        if (isCurrentlyBookmarked) {
          toast({
            title: "Bookmark Removed",
            description: `${title} has been removed from your bookmarks`,
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "top",
            variant: "solid",
          });
        } else {
          toast({
            title: "Bookmark Added",
            description: `${title} has been added to your bookmarks`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
            variant: "solid",
          });
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error);
        toast({
          title: "Error",
          description: "Failed to update bookmark. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          variant: "solid",
        });
      }
    },
    [toggleBookmark, bookmarks, toast]
  );

  const filteredMovies = useCallback(() => {
    return bookmarkedMovies.filter((movie) => (movie.title || "").toLowerCase().includes((searchTerm || "").toLowerCase()));
  }, [bookmarkedMovies, searchTerm]);

  const filteredSeries = useCallback(() => {
    return bookmarkedSeries.filter((serie) => (serie.title || serie.name || "").toLowerCase().includes((searchTerm || "").toLowerCase()));
  }, [bookmarkedSeries, searchTerm]);

  if (error) {
    return (
      <Layout isMoviePage={false}>
        <Container maxW={"100%"}>
          <Text color="red.500">{error}</Text>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout isMoviePage={false}>
      <Container maxW={"100%"}>
        <SearchInput onSearch={handleSearch} />
        {isLoading ? (
          <Center h="300px">
            <Spinner size="xl" color="white" />
          </Center>
        ) : (
          <MovieGrid
            text="Bookmarks"
            movies={filteredMovies()}
            tvSeries={filteredSeries()}
            useScrollContainer={false}
            isBookmarked={true}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </Container>
    </Layout>
  );
};
