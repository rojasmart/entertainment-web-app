import { Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
/* import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig"; */
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { Flex, Heading, Button, Input, FormControl, Box, VStack, useToast, Text } from "@chakra-ui/react";
import { useContext } from "react";

export const Login = () => {
  const { signInWithEmailPassword, user, loading, error } = useContext(AuthContext);

  const toast = useToast();

  function handleSignIn(values) {
    signInWithEmailPassword(values.email, values.password)
      .then((response) => {
        console.log(response);
        toast({
          title: "Success",
          description: "You have successfully signed in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  if (loading) {
    return <p>carregando...</p>;
  }
  if (user) {
    return <Navigate to="/Home" replace={true} />;
  }

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box p={6} color={"white"} rounded="20px" w={"lg"} bg="var(--semi-dark-blue)">
        <Heading mb={6} textAlign="left">
          Login
        </Heading>
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          onSubmit={handleSignIn}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <Field as={Input} type="text" name="email" id="email" placeholder="Email" />
                </FormControl>
                <FormControl>
                  <Field as={Input} type="password" name="password" id="password" placeholder="Password" />
                </FormControl>

                <Button type="submit" style={{ backgroundColor: "var(--red)" }} color={"white"} width="full" size={"lg"}>
                  Login to your account
                </Button>
                <Box className="footer" display={"flex"} alignSelf={"center"}>
                  <Text display={"flex"} gap={"21px"}>
                    Dont have an account?
                    <Link to="/register" color="blue" textDecoration="underline">
                      Sign up
                    </Link>
                  </Text>
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>
        {error && <p>{error.message}</p>}
      </Box>
    </Flex>
  );
};
