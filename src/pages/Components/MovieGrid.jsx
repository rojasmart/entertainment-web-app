import { Grid, Box } from "@chakra-ui/react";
import DragScroll from "react-drag-scroll";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export const MovieGrid = () => {
  return (
    <>
      <DragScroll>
        <Box overflowX="scroll" whiteSpace="nowrap">
          <Grid templateColumns="repeat(6, 1fr)" gap={6} py={6}>
            <Box
              bg="white"
              height="200px"
              borderRadius="md"
              p={3}
              minW="500px"
              display="inline-block"
            >
              {/* Card content goes here */}
            </Box>
            <Box
              bg="white"
              height="200px"
              borderRadius="md"
              p={3}
              minW="500px"
              display="inline-block"
            >
              {/* Card content goes here */}
            </Box>
            <Box
              bg="white"
              height="200px"
              borderRadius="md"
              p={3}
              minW="500px"
              display="inline-block"
            >
              {/* Card content goes here */}
            </Box>
            <Box
              bg="white"
              height="200px"
              borderRadius="md"
              p={3}
              minW="500px"
              display="inline-block"
            >
              {/* Card content goes here */}
            </Box>
            <Box
              bg="white"
              height="200px"
              borderRadius="md"
              p={3}
              minW="500px"
              display="inline-block"
            >
              {/* Card content goes here */}
            </Box>
            <Box
              bg="white"
              height="200px"
              borderRadius="md"
              p={3}
              minW="500px"
              display="inline-block"
            >
              {/* Card content goes here */}
            </Box>
            {/* Add more cards as needed */}
          </Grid>
        </Box>
      </DragScroll>
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
