import { useLocation } from "react-router-dom";

import { Container, Text, Box } from "@chakra-ui/react";
import { Layout } from "../pages/Home";

export const MoviePage = () => {
  const location = useLocation();
  const item = location.state.item;

  return (
    <Layout>
      <Container
        maxW={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text color="white" fontSize={"4xl"}>
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
        <Box maxW="800px" p={4} bg="gray.700" borderRadius="md" mt={4}>
          <Text color="white" fontSize={"xl"}>
            {item.overview}
          </Text>
        </Box>
      </Container>
    </Layout>
  );
};
