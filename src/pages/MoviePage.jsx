import { useParams, useNavigate } from "react-router-dom";
import { Container, Text, Box, List, ListItem, IconButton, Flex, Spinner, Center } from "@chakra-ui/react";
import { Layout } from "../pages/Home";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../api/Auth";

export const MoviePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        // Add isMovie flag for consistency with the original code
        setItem({ ...data, isMovie: true });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Center minH="100vh">
          <Spinner size="xl" color="red.500" />
        </Center>
      </Layout>
    );
  }

  if (error || !item) {
    return (
      <Layout>
        <Center minH="100vh">
          <Text color="white" fontSize="xl">
            {error || "Movie not found"}
          </Text>
        </Center>
      </Layout>
    );
  }

  const movieBackground = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Layout isMoviePage={true} backgroundImage={movieBackground}>
      <Container maxW={"900px"} position="relative" px={4}>
        {/* Back button positioned at the top left */}
        <Box position="absolute" top={4} left={4} zIndex={10}>
          <IconButton
            icon={<ArrowBackIcon />}
            colorScheme="red"
            variant="ghost"
            size="lg"
            aria-label="Go back"
            onClick={handleGoBack}
            _hover={{ bg: "rgba(252, 71, 71, 0.2)" }}
            boxShadow="lg"
          />
        </Box>

        <Flex
          direction="column"
          align="flex-start"
          pt={20} // Add padding top to make room for the back button
        >
          <Text mb={8} color="white" fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }} fontWeight="bold">
            {item.title || item.original_name}
          </Text>

          <Box width="100%">
            <List styleType="disc" display="flex" flexDirection="row" alignItems="flex-start" mb={3}>
              <ListItem color={"white"} fontSize={"md"} marginRight={6} listStyleType="none">
                {new Date(item.isMovie ? item.release_date : item.first_air_date).getFullYear()}
              </ListItem>
              <ListItem color={"white"} fontSize={"md"}>
                {item.isMovie ? "Movie" : "TV Series"}
              </ListItem>
            </List>
            <Box width="100%" overflow="hidden" borderRadius="20px" boxShadow="2xl">
              <video width="100%" style={{ borderRadius: "20px" }} controls>
                <source src={item.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            <Box borderRadius="md" mt={8}>
              <Text color="white" fontSize={"xl"}>
                {item.overview}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};
