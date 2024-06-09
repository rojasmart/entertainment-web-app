import { useLocation } from "react-router-dom";

import { Container, Text, Box, List, ListItem } from "@chakra-ui/react";
import { Layout } from "../pages/Home";

export const MoviePage = () => {
  const location = useLocation();
  const item = location.state.item;

  const movieBackground = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;

  return (
    <Layout isMoviePage={true} backgroundImage={movieBackground}>
      <Container
        maxW={"900px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text
          mt={14}
          mb={8}
          color="white"
          fontSize={"7xl"}
          alignSelf={"flex-start"}
          fontWeight={"bold"}
          ml={8}
        >
          {item.title}
        </Text>

        <Box maxW="825px" p={4}>
          <List
            styleType="disc"
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            mb={3}
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
          <video
            width="800"
            height="240"
            style={{ borderRadius: "20px" }}
            controls
          >
            <source src={item.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Box borderRadius="md" mt={8}>
            <Text color="white" fontSize={"xl"}>
              {item.overview}
            </Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
