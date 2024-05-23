import { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../services/firebaseConfig";

import {
  Flex,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const { signInGoogle, signed } = useContext(AuthGoogleContext);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  if (loading) {
    return <p>carregando...</p>;
  }
  if (user) {
    return <Navigate to="/Home" />;
  }

  async function handleLoginFromGoogle() {
    await signInGoogle();
  }
  if (!signed) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Heading mb={6} textAlign="left">
          Por favor digite suas informações de login
        </Heading>

        <form onSubmit={handleSignIn}>
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <a href="#">Esqueceu sua senha ?</a>
          <Button className="button">
            Entrar <img alt="->" />
          </Button>
          <div className="footer">
            <p>Você não tem uma conta?</p>
            <Link to="/register">Crie a sua conta aqui</Link>
          </div>
          <Button onClick={handleLoginFromGoogle}>Logar com o Google</Button>;
        </form>
        {error && <p>{error.message}</p>}
      </Flex>
    );
  } else {
    return <Navigate to="/Home" />;
  }
};

/* <Flex align="center" justify="center" h="100vh">
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
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Field
                  as={Checkbox}
                  id="rememberMe"
                  name="rememberMe"
                  colorScheme="purple"
                >
                  Remember me?
                </Field>
                <Button
                  type="submit"
                  style={{ backgroundColor: "var(--red)" }}
                  color={"white"}
                  width="full"
                  size={"lg"}
                >
                  Login to your account
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex> */
