import { Container } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { SearchInput } from "../pages/Components/SearchInput";
import { MovieGrid } from "../pages/Components/MovieGrid";

export const Bookmarks = () => {
  return (
    <Layout>
      <Container maxW={"100%"}>
        <SearchInput />
        <MovieGrid text="Bookmarks" useScrollContainer={false} />
      </Container>
    </Layout>
  );
};
