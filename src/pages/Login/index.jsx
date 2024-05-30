import { Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
/* import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig"; */
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import {
  Flex,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

export const Login = () => {
  /*  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth); */
  const { signInWithEmailPassword, user, loading, error } =
    useContext(AuthContext);

  function handleSignIn(values) {
    console.log("values", values);
    signInWithEmailPassword(values.email, values.password);
  }

  if (loading) {
    return <p>carregando...</p>;
  }
  if (user) {
    return <Navigate to="/Home" replace={true} />;
  }

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box
        p={6}
        color={"white"}
        rounded="20px"
        w={"lg"}
        bg="var(--semi-dark-blue)"
      >
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
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="johndoe@gmail.com"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Field
                    as={Input}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********************"
                  />
                </FormControl>
                <a href="#">Esqueceu a senha ?</a>
                <Button
                  type="submit"
                  style={{ backgroundColor: "var(--red)" }}
                  color={"white"}
                  width="full"
                  size={"lg"}
                >
                  Entrar
                </Button>
                <div className="footer">
                  <p>Você não tem uma conta?</p>
                  <Link to="/register">Crie a sua conta aqui</Link>
                </div>
              </VStack>
            </Form>
          )}
        </Formik>
        {error && <p>{error.message}</p>}
      </Box>
    </Flex>
  );
};
