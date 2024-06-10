import { useState, useContext } from "react";
import propTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Text,
  Flex,
  Card,
  List,
  ListItem,
  Image,
  Button,
} from "@chakra-ui/react";

import { AuthContext } from "../../contexts/auth";

import ScrollContainer from "react-indiana-drag-scroll";

import MoviesIcon from "../../assets/icon-nav-movies.svg";
import TvSeriesIcon from "../../assets/icon-nav-tv-series.svg";
import BookmarkIconEmpty from "../../assets/icon-bookmark-empty.svg";
import BookmarkIconFull from "../../assets/icon-bookmark-full.svg";
import IconPlay from "../../assets/icon-play.svg";

export const MovieGrid = ({
  text,
  textScroll,
  useScrollContainer,
  trending,
  movies,
  tvSeries,
}) => {
  const moviesWithFlag = movies
    ? movies.map((movie) => ({ ...movie, isMovie: true }))
    : [];
  const tvSeriesWithFlag = tvSeries
    ? tvSeries.map((series) => ({ ...series, isMovie: false }))
    : [];

  const allItems =
    tvSeriesWithFlag.length > 0
      ? [...moviesWithFlag, ...tvSeriesWithFlag].sort(() => Math.random() - 0.5)
      : [...moviesWithFlag].sort(() => Math.random() - 0.5);

  /* function BookmarkIcon({ item }) {
    const { addBookmark } = useContext(AuthContext);

    function handleClick() {
      const bookmark = { title: item.title, url: "https://example.com" };
      addBookmark(bookmark);
    }

    return <button onClick={handleClick}>Bookmark</button>;
  } */

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
      <Text mb={6} color="white" fontSize={"3xl"}>
        {text}
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {allItems.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </Grid>
    </>
  );
};

function MovieCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBoxHovered, setIsBoxHovered] = useState(false);

  const navigate = useNavigate();
  const { addBookmark } = useContext(AuthContext); // Get addBookmark from context

  const handleBookmarkClick = () => {
    const bookmark = { title: item.title, url: "https://example.com" };
    addBookmark(bookmark);
  };
  return (
    <>
      <Box>
        <Card
          key={item.id}
          bg="white"
          height="280px"
          borderRadius="md"
          p={3}
          minW="174px"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform .2s", // Add this line
            ":hover": {
              "::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
                opacity: 0,
                transition: "opacity .2s",
              },
              ":hover::after": {
                opacity: 1,
              },
            },
          }}
        >
          <Box
            position="absolute"
            top={2}
            right={2}
            borderRadius="full"
            overflow="hidden"
            backgroundColor={"var(--semi-dark-blue)"}
            p={2}
            zIndex={10}
            cursor={"pointer"}
            onMouseEnter={() => setIsBoxHovered(true)}
            onMouseLeave={() => setIsBoxHovered(false)}
            onClick={handleBookmarkClick}
          >
            <Image
              src={isBoxHovered ? BookmarkIconFull : BookmarkIconEmpty}
              boxSize={3}
            />
          </Box>
          {isHovered && (
            <Button
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              colorScheme="red"
              zIndex={9}
              size={"lg"}
              cursor={"pointer"}
              onClick={() =>
                navigate(`/Movies/${item.id}`, { state: { item } })
              }
              leftIcon={<Image src={IconPlay} />}
              sx={{
                borderRadius: "full",
              }}
              w={"100px"}
            >
              Play
            </Button>
          )}
        </Card>

        <Box as="div" mt={2}>
          <List styleType="disc" display="flex" flexDirection="row">
            <ListItem
              color={"white"}
              fontSize={"md"}
              marginRight={6}
              listStyleType="none"
              fontWeight={"100"}
            >
              {new Date(
                item.isMovie ? item.release_date : item.first_air_date
              ).getFullYear()}
            </ListItem>
            <ListItem color={"white"} fontSize={"md"} fontWeight={"100"}>
              {item.isMovie ? (
                <Flex align="center">
                  <Image src={MoviesIcon} alt="movies" boxSize="15px" />
                  <Text ml={2}>Movie</Text>
                </Flex>
              ) : (
                <Flex align="center">
                  <Image src={TvSeriesIcon} alt="tvseries" boxSize="15px" />
                  <Text ml={2}>TV Series</Text>
                </Flex>
              )}
            </ListItem>
          </List>
        </Box>
        <Text color={"white"} fontSize={"1xl"}>
          {item.isMovie ? item.title : item.original_name}
        </Text>
      </Box>
    </>
  );
}

MovieGrid.propTypes = {
  text: propTypes.string,
  textScroll: propTypes.string,
  useScrollContainer: propTypes.bool,
  trending: propTypes.array,
  movies: propTypes.array,
  tvSeries: propTypes.array,
};
