import { Container } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";

export const Movies = () => {
  return (
    <Layout>
      <Container maxW={"100%"}>
        <SearchInput />
        <MovieGrid text="Movies" useScrollContainer={false} />
      </Container>
    </Layout>
  );
};
