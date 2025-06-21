import { Link, useLocation } from "react-router-dom";
import { Box, Stack, Image, Flex, Avatar, Text, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Logo from "../../assets/logo.svg";
import HomeIcon from "../../assets/icon-nav-home.svg";
import MoviesIcon from "../../assets/icon-nav-movies.svg";
import TvSeriesIcon from "../../assets/icon-nav-tv-series.svg";
import BookmarkIcon from "../../assets/icon-nav-bookmark.svg";

// NavLink component with active state and hover effect
const NavLink = ({ to, icon, alt }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link to={to}>
      <Box
        position="relative"
        p={2}
        borderRadius="md"
        transition="all 0.2s"
        _hover={{
          transform: "scale(1.1)",
          filter: "brightness(1.2)",
        }}
        sx={{
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: isActive ? "100%" : "0%",
            height: "3px",
            bg: "var(--primary-red)",
            transition: "width 0.3s ease",
            borderRadius: "2px",
          },
        }}
      >
        <Image src={icon} alt={alt} filter={isActive ? "brightness(1.5)" : "brightness(1)"} />
        {isActive && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderRadius="md"
            boxShadow={`0 0 10px 2px var(--primary-red)`}
            opacity="0.4"
            pointerEvents="none"
          />
        )}
      </Box>
    </Link>
  );
};

const SidebarNav = ({ user, handleLogout, boxBg }) => (
  <Stack
    as="nav"
    direction={{ base: "row", md: "column" }}
    p={{ base: 4, md: 2 }}
    width={{ base: "auto", md: "96px" }}
    justifyContent="space-between"
    alignItems="center"
    spacing={4}
    height={{ base: "80px", md: "90vh" }}
    borderRadius="20px"
    m={6}
    backgroundColor={boxBg}
    overflowX="auto"
  >
    <Box display="flex" flexDirection={{ base: "row", md: "column" }} gap={6} alignItems="center">
      <Image src={Logo} alt="Logo" mt={{ base: 0, md: 6 }} mb={{ base: 0, md: 12 }} />
      <NavLink to="/Home" icon={HomeIcon} alt="home" />
      <NavLink to="/Movies" icon={MoviesIcon} alt="movies" />
      <NavLink to="/Tvseries" icon={TvSeriesIcon} alt="tvseries" />
      <NavLink to="/Bookmarks" icon={BookmarkIcon} alt="bookmark" />
    </Box>
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" mb={{ base: 0, md: 6 }} p={0}>
        <Flex direction="column" align="center">
          <Avatar size="sm" src={user?.photoURL || undefined} name={user?.displayName || user?.email || ""} />
          <Text mt={1} fontSize="xs" display={{ base: "none", md: "block" }}>
            {user?.displayName || user?.email || "User"}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} to="/Profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </MenuList>
    </Menu>
  </Stack>
);

export default SidebarNav;
