import React, { useState, useContext } from "react";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Text, Flex, Card, List, ListItem, Image, Button, useToast } from "@chakra-ui/react";
import { AuthContext } from "../../contexts/auth";
import ScrollContainer from "react-indiana-drag-scroll";
import MoviesIcon from "../../assets/icon-nav-movies.svg";
import TvSeriesIcon from "../../assets/icon-nav-tv-series.svg";
import BookmarkIconEmpty from "../../assets/icon-bookmark-empty.svg";
import BookmarkIconFull from "../../assets/icon-bookmark-full.svg";
import IconPlay from "../../assets/icon-play.svg";

// Separated MovieCard component with export to make sure it's treated as a proper component
export function MovieCard({ item, isBookmarked, onToggleBookmark }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBoxHovered, setIsBoxHovered] = useState(false);
  const { bookmarks, addBookmark, removeBookmark } = useContext(AuthContext);

  const toast = useToast();

  const navigate = useNavigate();
  const isItemBookmarked = bookmarks?.some((bookmark) => bookmark.id === item.id);

  const showAddedToast = (title) => {
    toast({
      title: "Bookmark Added",
      description: `${title} has been added to your bookmarks`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
      variant: "solid",
    });
  };

  const showRemovedToast = (title) => {
    toast({
      title: "Bookmark Removed",
      description: `${title} has been removed from your bookmarks`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
      variant: "solid",
    });
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    const title = item.title || item.name || item.original_name;

    if (onToggleBookmark) {
      onToggleBookmark(item);

      // Show appropriate toast based on current bookmark status
      if (isItemBookmarked) {
        showRemovedToast(title);
      } else {
        showAddedToast(title);
      }
    } else {
      // Fallback to legacy method
      if (isItemBookmarked) {
        const bookmark = { id: item.id, title: title };
        removeBookmark(bookmark)
          .then(() => {
            showRemovedToast(title);
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "Failed to remove bookmark. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
              variant: "solid",
            });
            console.error("Error removing bookmark:", error);
          });
      } else {
        const bookmark = {
          id: item.id,
          title: title,
          type: item.isMovie ? "movie" : "tv",
        };
        addBookmark(bookmark)
          .then(() => {
            showAddedToast(title);
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "Failed to add bookmark. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
              variant: "solid",
            });
            console.error("Error adding bookmark:", error);
          });
      }
    }
  };

  return (
    <Box>
      <Card
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
          transition: "transform .2s",
          ":hover": {
            "::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          <Image src={isItemBookmarked ? BookmarkIconFull : BookmarkIconEmpty} boxSize={3} />
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
            onClick={() => navigate(`/Movies/${item.id}`, { state: { item } })}
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
          <ListItem color={"white"} fontSize={"md"} marginRight={6} listStyleType="none" fontWeight={"100"}>
            {item.isMovie && item.release_date && new Date(item.release_date).getFullYear()}
            {!item.isMovie && item.first_air_date && new Date(item.first_air_date).getFullYear()}
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
  );
}

// Main MovieGrid component
export function MovieGrid({ text, textScroll, useScrollContainer, trending, movies, tvSeries, isBookmarked, onToggleBookmark }) {
  const moviesWithFlag = movies ? movies.map((movie) => ({ ...movie, isMovie: true })) : [];
  const tvSeriesWithFlag = tvSeries ? tvSeries.map((series) => ({ ...series, isMovie: false })) : [];

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
          <ScrollContainer className="scroll-container" horizontal={true} vertical={false} hideScrollbars={true}>
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
                  <Flex direction="column" height="100%" justifyContent="flex-end">
                    <Text color={"white"} fontSize={"1xl"}>
                      {movie.title}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </ScrollContainer>
        </>
      ) : null}
      <Text mb={6} color="white" fontSize={"3xl"}>
        {text}
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // Mobile
          sm: "repeat(2, 1fr)", // Small screens
          md: "repeat(3, 1fr)", // Medium screens
          lg: "repeat(4, 1fr)", // Large screens
          xl: "repeat(5, 1fr)", // Extra large screens
        }}
        gap={6}
      >
        {allItems.map((item) => (
          <MovieCard key={item.id} item={item} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} />
        ))}
      </Grid>
    </>
  );
}

// PropTypes definitions
MovieGrid.propTypes = {
  text: propTypes.string,
  textScroll: propTypes.string,
  useScrollContainer: propTypes.bool,
  trending: propTypes.array,
  movies: propTypes.array,
  tvSeries: propTypes.array,
  isBookmarked: propTypes.bool,
  onToggleBookmark: propTypes.func,
};

MovieCard.propTypes = {
  item: propTypes.object.isRequired,
  isBookmarked: propTypes.bool,
  onToggleBookmark: propTypes.func,
};
