import { Field, Formik, Form } from "formik";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";
import { Button, Heading, Flex, Box, Input, VStack, FormControl, Text } from "@chakra-ui/react";

export function Register() {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box p={6} color={"white"} rounded="20px" w={"lg"} bg="var(--semi-dark-blue)">
        <Heading mb={6} textAlign="left">
          Sign up
        </Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            createUserWithEmailAndPassword(values.email, values.password);
          }}
        >
          <Form>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <Field as={Input} type="text" name="email" id="email" placeholder="Email" />
              </FormControl>

              <FormControl>
                <Field as={Input} type="password" name="password" id="password" placeholder="Password" />
              </FormControl>

              <Button style={{ backgroundColor: "var(--red)" }} color={"white"} width="full" size={"lg"} type="submit">
                Create an account
              </Button>
              <Box className="footer" display={"flex"} alignSelf={"center"}>
                <Text display={"flex"} gap={"21px"}>
                  Already have an account?
                  <Link to="/" color={"blue"}>
                    Log in
                  </Link>
                </Text>
              </Box>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
}
