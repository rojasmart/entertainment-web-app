import { Field, Formik, Form } from "formik";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";
import {
  Button,
  Heading,
  Flex,
  Box,
  Input,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export function Register() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  if (loading) {
    return <p>carregando...</p>;
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
          Por favor digite as suas informações
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

              <Button
                style={{ backgroundColor: "var(--red)" }}
                color={"white"}
                width="full"
                size={"lg"}
                type="submit"
              >
                Registar
              </Button>
              <div className="footer">
                <p>Já tem uma conta?</p>
                <Link to="/">Aceda à conta aqui</Link>
              </div>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
}
