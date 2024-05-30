import { Button, Text, Box } from "@chakra-ui/react";
import { useContext } from "react"; // Import useContext hook from React
import { AuthContext } from "../../contexts/auth"; // Import your AuthGoogleContext

export const Home = () => {
  const { signOut } = useContext(AuthContext); // Access signOut function from the context

  const handleLogout = () => {
    signOut(); // Call signOut function
  };

  return (
    <Box>
      <Text fontSize={"6xl"} color={"white"}>
        Home
      </Text>
      <Button onClick={handleLogout}>Log out</Button>
    </Box>
  );
};
