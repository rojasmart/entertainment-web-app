import { Grid, Box } from "@chakra-ui/react";

import ScrollContainer from "react-indiana-drag-scroll";

export const MovieGrid = () => {
  return (
    <>
      <ScrollContainer
        className="scroll-container"
        horizontal={true}
        vertical={false}
        hideScrollbars={true}
      >
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
      </ScrollContainer>

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
