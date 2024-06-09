import { useState, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";
import { getTVSeries } from "../api/Auth";

export const TvSeries = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getTVSeries().then((data) => setSeries(data.results));
  }, []);

  console.log("series", series);

  return (
    <Layout isMoviePage={false}>
      <Container maxW={"100%"}>
        <SearchInput />
        <MovieGrid
          text="TV Series"
          useScrollContainer={false}
          series={series}
        />
      </Container>
    </Layout>
  );
};
