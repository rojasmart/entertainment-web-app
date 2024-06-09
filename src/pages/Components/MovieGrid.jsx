import propTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import { Grid, Box, Text, Flex, Card, List, ListItem } from "@chakra-ui/react";

import ScrollContainer from "react-indiana-drag-scroll";

export const MovieGrid = ({
  text,
  textScroll,
  useScrollContainer,
  trending,
  movies,
  series,
}) => {
  const navigate = useNavigate();

  console.log("series", series);

  const moviesWithFlag = movies
    ? movies.map((movie) => ({ ...movie, isMovie: true }))
    : [];
  const tvSeriesWithFlag = series
    ? series.map((series) => ({ ...series, isMovie: false }))
    : [];

  const allItems =
    tvSeriesWithFlag.length > 0
      ? [...moviesWithFlag, ...tvSeriesWithFlag].sort(() => Math.random() - 0.5)
      : [...moviesWithFlag].sort(() => Math.random() - 0.5);

  return (
    <>
      {useScrollContainer ? (
        <>
          <Text color="white" fontSize={"3xl"}>
            {textScroll}
          </Text>
          <ScrollContainer
            className="scroll-container"
            horizontal={true}
            vertical={false}
            hideScrollbars={true}
          >
            <Grid templateColumns="repeat(20, 1fr)" gap={6} py={6}>
              {trending.map((movie) => (
                <Box
                  key={movie.id}
                  bg="white"
                  height="250px"
                  borderRadius="md"
                  p={3}
                  minW="500px"
                  display="inline-block"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Flex
                    direction="column"
                    height="100%"
                    justifyContent="flex-end"
                  >
                    <Text color={"white"} fontSize={"1xl"}>
                      {movie.title}
                    </Text>
                  </Flex>
                </Box>
              ))}
              {/* Add more cards as needed */}
            </Grid>
          </ScrollContainer>
        </>
      ) : null}
      <Text color="white" fontSize={"3xl"}>
        {text}
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {allItems.map((item) => (
          <>
            <Box
              onClick={() =>
                navigate(`/Movies/${item.id}`, { state: { item } })
              }
              cursor={"pointer"}
            >
              <Card
                key={item.id}
                bg="white"
                height="280px"
                borderRadius="md"
                p={3}
                minW="174px"
                sx={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform .2s", // Add this line
                  ":hover": {
                    transform: "scale(1.03)", // Add this line
                  },
                }}
              />
              <Box as="div">
                <List styleType="disc" display="flex" flexDirection="row">
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
              </Box>
              <Text color={"white"} fontSize={"1xl"}>
                {item.isMovie ? item.title : item.original_name}
              </Text>
            </Box>
          </>
        ))}

        {/* Add more cards as needed */}
      </Grid>
    </>
  );
};

MovieGrid.propTypes = {
  text: propTypes.string,
  textScroll: propTypes.string,
  useScrollContainer: propTypes.bool,
  trending: propTypes.array,
  movies: propTypes.array,
  series: propTypes.array,
};
