import { Grid, Box } from "@chakra-ui/react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const MovieGrid = () => {
  return (
    <>
      <Box mb={5}>
        <Carousel showThumbs={false}>
          <Box bg="white" height="200px" borderRadius="md" p={3}>
            {/* Card content goes here */}
          </Box>
          <Box bg="white" height="200px" borderRadius="md" p={3}>
            {/* Card content goes here */}
          </Box>
          <Box bg="white" height="200px" borderRadius="md" p={3}>
            {/* Card content goes here */}
          </Box>
          <Box bg="white" height="200px" borderRadius="md" p={3}>
            {/* Card content goes here */}
          </Box>
          {/* Add more cards as needed */}
        </Carousel>
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>
        <Box bg="white" height="200px" borderRadius="md" p={3}>
          {/* Card content goes here */}
        </Box>

        {/* Add more cards as needed */}
      </Grid>
    </>
  );
};
