import {
  Box,
  Flex,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useContext } from "react"; // Import useContext hook from React
import { AuthContext } from "../../contexts/auth"; // Import your AuthGoogleContext
import { SearchInput } from "../Components/SearchInput";

export const Layout = ({ children }) => {
  const { signOut } = useContext(AuthContext); // Access signOut function from the context
  const handleLogout = () => {
    signOut(); // Call signOut function
  };
  return (
    <Flex height="100vh">
      <VStack
        as="nav"
        bg="gray.200"
        p={4}
        width="200px"
        justifyContent="start"
        alignItems="start"
        spacing={4}
      >
        <Button>Menu Item 1</Button>
        <Button>Menu Item 2</Button>
        <Button>Menu Item 3</Button>
        <Button>Menu Item 4</Button>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
          >
            <Avatar size={"sm"} />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </VStack>
      <Box flex="1" overflowY="auto">
        {children}
      </Box>
    </Flex>
  );
};

export const Home = () => {
  return (
    <Layout>
      <Container maxW={"100%"}>
        <SearchInput />
      </Container>
    </Layout>
  );
};
