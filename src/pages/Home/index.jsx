import { Box, Flex, Text, Button, VStack, Card } from "@chakra-ui/react";
import { useContext } from "react"; // Import useContext hook from React
import { AuthContext } from "../../contexts/auth"; // Import your AuthGoogleContext

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
        <Button onClick={handleLogout}>Log out</Button>
        {/* Add more menu items here */}
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
      <Card></Card>
    </Layout>
  );
};
