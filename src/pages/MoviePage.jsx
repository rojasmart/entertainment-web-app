import { useLocation } from "react-router-dom";

import { Container, Text, Box, List, ListItem } from "@chakra-ui/react";
import { Layout } from "../pages/Home";

export const MoviePage = () => {
  const location = useLocation();
  const item = location.state.item;

  const movieBackground = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;

  return (
    <Layout backgroundImage={movieBackground}>
      <Container
        maxW={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text mt={6} mb={6} color="white" fontSize={"4xl"}>
          {item.title}
        </Text>

        <video
          width="800"
          height="240"
          style={{ borderRadius: "20px" }}
          controls
        >
          <source src={item.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box maxW="825px" p={4} mt={2}>
          <List
            styleType="disc"
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
          >
            <ListItem
              color={"white"}
              fontSize={"md"}
              marginRight={6}
              listStyleType="none"
            >
              {new Date(
                item.isMovie ? item.release_date : item.first_air_date
              ).getFullYear()}
            </ListItem>
            <ListItem color={"white"} fontSize={"md"}>
              {item.isMovie ? "Movie" : "TV Series"}
            </ListItem>
          </List>
          <Box p={4} bg="gray.700" borderRadius="md" mt={4}>
            <Text color="white" fontSize={"xl"}>
              {item.overview}
            </Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
