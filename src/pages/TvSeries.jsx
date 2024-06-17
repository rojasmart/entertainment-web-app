import { useState, useEffect, useCallback } from "react";
import { Container } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";
import { getTVSeries } from "../api/Auth";

export const TvSeries = () => {
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    getTVSeries().then((data) => setSeries(data.results));
  }, []);

  const filteredSeries = useCallback(() => {
    return series.filter((serie) =>
      serie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [series, searchTerm]);

  return (
    <Layout isMoviePage={false}>
      <Container maxW={"100%"}>
        <SearchInput onSearch={handleSearch} />
        <MovieGrid
          text="TV Series"
          useScrollContainer={false}
          tvSeries={filteredSeries()}
        />
      </Container>
    </Layout>
  );
};
