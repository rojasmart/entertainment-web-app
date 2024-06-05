import { useParams } from "react-router-dom";

import { Container, Text } from "@chakra-ui/react";
import { Layout } from "../pages/Home";

export const MoviePage = () => {
  const { id } = useParams();
  console.log("renderizei");
  return (
    <Layout>
      <Container maxW={"100%"}>
        <Text color="white" fontSize={"6xl"}>
          This is the movie page for {id}
        </Text>
      </Container>
    </Layout>
  );
};
