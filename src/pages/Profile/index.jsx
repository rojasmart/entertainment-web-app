import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { Field, Formik, Form } from "formik";
import { Layout } from "../Home";
import {
  Avatar,
  Button,
  Container,
  Heading,
  Box,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Divider,
  Switch,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Icon,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon, ViewIcon, ViewOffIcon, DeleteIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import * as Yup from "yup";

const ProfileValidationSchema = Yup.object().shape({
  displayName: Yup.string().min(2, "Name is too short").max(50, "Name is too long").nullable(),
  photoURL: Yup.string()
    .url("Invalid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const PasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required")
    .notOneOf([Yup.ref("currentPassword")], "New password must be different"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm your new password"),
});

export const Profile = () => {
  const {
    user,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    deleteUserAccount,
    verifyPassword,
    signOut,
    loading: authLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  const { isOpen: isDeleteAlertOpen, onOpen: onDeleteAlertOpen, onClose: onDeleteAlertClose } = useDisclosure();

  const cancelRef = React.useRef();

  useEffect(() => {
    if (user) {
      setUserData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (values) => {
    setIsLoading(true);
    try {
      // Logs detalhados para debug
      console.log("Iniciando atualização de perfil");
      console.log("Valores do formulário:", values);
      console.log("Estado atual do usuário:", user);
      console.log("Estado atual do userData:", userData);

      // Garantir que estamos trabalhando com strings para o Firebase
      const profileData = {
        displayName: values.displayName || "",
        photoURL: values.photoURL || "",
      };
      console.log("Dados a serem enviados para o Firebase:", profileData);

      // Tentar atualizar o perfil diretamente com o Firebase
      try {
        // Atualize o perfil do usuário no Firebase
        const result = await updateUserProfile(profileData);
        console.log("Resposta do Firebase após atualização:", result);
      } catch (firebaseError) {
        console.error("Erro específico do Firebase:", firebaseError);
        throw firebaseError; // Propagar o erro para ser tratado abaixo
      }

      // Se chegou aqui, a atualização foi bem-sucedida
      console.log("Atualizando estado local com novos dados");

      // Atualize o estado local
      setUserData({
        ...userData,
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      setIsEditingProfile(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Atualização de perfil concluída com sucesso");
    } catch (error) {
      console.error("Erro completo durante atualização de perfil:", error);
      console.error("Tipo de erro:", typeof error);
      console.error("Mensagem de erro:", error.message);
      console.error("Stack trace:", error.stack);

      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmail = async (values) => {
    if (values.email === user.email) {
      setIsEditingEmail(false);
      return;
    }

    setIsLoading(true);
    try {
      await updateUserEmail(values.email);
      setUserData({
        ...userData,
        email: values.email,
      });
      setIsEditingEmail(false);
      toast({
        title: "Email Updated",
        description: "Your email has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    setIsLoading(true);
    try {
      // First verify current password
      await verifyPassword(values.currentPassword);

      // Then update to new password
      await updateUserPassword(values.newPassword);

      setIsChangingPassword(false);
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password. Please check your current password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserAccount();
      onDeleteAlertClose();
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      signOut();
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Layout isMoviePage={false}>
        <Container maxW="container.md" centerContent py={10}>
          <Spinner size="xl" color="red.500" />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout isMoviePage={false}>
      <Container maxW="container.md" py={10}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" color="white" mb={6}>
            Profile Settings
          </Heading>

          {/* Profile Section */}
          <Box bg="var(--semi-dark-blue)" borderRadius="lg" p={6}>
            <VStack align="start" spacing={6}>
              <HStack justifyContent="space-between" width="100%">
                <Heading as="h2" size="md" color="white">
                  Profile Information
                </Heading>
                {!isEditingProfile ? (
                  <Button leftIcon={<EditIcon />} colorScheme="red" variant="outline" onClick={() => setIsEditingProfile(true)}>
                    Edit
                  </Button>
                ) : (
                  <HStack>
                    <Button leftIcon={<CloseIcon />} colorScheme="gray" variant="outline" onClick={() => setIsEditingProfile(false)}>
                      Cancel
                    </Button>
                  </HStack>
                )}
              </HStack>

              <Formik
                enableReinitialize
                initialValues={{
                  displayName: userData.displayName || "",
                  photoURL: userData.photoURL || "",
                }}
                validationSchema={ProfileValidationSchema}
                onSubmit={handleUpdateProfile}
              >
                {({ errors, touched, isValid, values }) => (
                  <Form style={{ width: "100%" }}>
                    <VStack spacing={5} align="start">
                      <HStack spacing={6} width="100%">
                        <Avatar size="xl" name={userData.displayName || user?.email} src={userData.photoURL} bg="var(--red)" />
                        <VStack align="start" flex={1}>
                          {isEditingProfile ? (
                            <FormControl isInvalid={errors.displayName && touched.displayName}>
                              <FormLabel htmlFor="displayName" color="white">
                                Display Name
                              </FormLabel>
                              <Field as={Input} id="displayName" name="displayName" color="white" />
                              <FormErrorMessage>{errors.displayName}</FormErrorMessage>
                            </FormControl>
                          ) : (
                            <>
                              <Text color="gray.400">Display Name</Text>
                              <Text color="white" fontWeight="bold" fontSize="lg">
                                {userData.displayName || "Not set"}
                              </Text>
                            </>
                          )}
                        </VStack>
                      </HStack>

                      {isEditingProfile && (
                        <FormControl isInvalid={errors.photoURL && touched.photoURL}>
                          <FormLabel htmlFor="photoURL" color="white">
                            Profile Picture URL
                          </FormLabel>
                          <Field as={Input} id="photoURL" name="photoURL" placeholder="https://example.com/your-photo.jpg" color="white" />
                          <FormErrorMessage>{errors.photoURL}</FormErrorMessage>
                        </FormControl>
                      )}

                      {isEditingProfile && (
                        <Button mt={4} colorScheme="red" isLoading={isLoading} type="submit" leftIcon={<CheckIcon />}>
                          Save Changes
                        </Button>
                      )}
                    </VStack>
                  </Form>
                )}
              </Formik>
            </VStack>
          </Box>

          {/* Email Section */}
          <Box bg="var(--semi-dark-blue)" borderRadius="lg" p={6}>
            <VStack align="start" spacing={6}>
              <HStack justifyContent="space-between" width="100%">
                <Heading as="h2" size="md" color="white">
                  Email Address
                </Heading>
                {!isEditingEmail ? (
                  <Button leftIcon={<EditIcon />} colorScheme="red" variant="outline" onClick={() => setIsEditingEmail(true)}>
                    Edit
                  </Button>
                ) : (
                  <HStack>
                    <Button leftIcon={<CloseIcon />} colorScheme="gray" variant="outline" onClick={() => setIsEditingEmail(false)}>
                      Cancel
                    </Button>
                  </HStack>
                )}
              </HStack>

              <Formik
                enableReinitialize
                initialValues={{ email: userData.email }}
                validationSchema={ProfileValidationSchema}
                onSubmit={handleUpdateEmail}
              >
                {({ errors, touched, isValid, dirty }) => (
                  <Form style={{ width: "100%" }}>
                    <VStack spacing={5} align="start" width="100%">
                      {isEditingEmail ? (
                        <FormControl isInvalid={errors.email && touched.email}>
                          <FormLabel htmlFor="email" color="white">
                            Email Address
                          </FormLabel>
                          <Field as={Input} id="email" name="email" type="email" color="white" />
                          <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                      ) : (
                        <>
                          <Text color="gray.400">Email Address</Text>
                          <Text color="white" fontWeight="bold">
                            {userData.email}
                          </Text>
                        </>
                      )}

                      {isEditingEmail && (
                        <Button mt={4} colorScheme="red" isLoading={isLoading} type="submit" leftIcon={<CheckIcon />} isDisabled={!isValid}>
                          Update Email
                        </Button>
                      )}
                    </VStack>
                  </Form>
                )}
              </Formik>
            </VStack>
          </Box>

          {/* Password Section */}
          <Box bg="var(--semi-dark-blue)" borderRadius="lg" p={6}>
            <VStack align="start" spacing={6}>
              <HStack justifyContent="space-between" width="100%">
                <Heading as="h2" size="md" color="white">
                  Password
                </Heading>
                {!isChangingPassword ? (
                  <Button leftIcon={<EditIcon />} colorScheme="red" variant="outline" onClick={() => setIsChangingPassword(true)}>
                    Change Password
                  </Button>
                ) : (
                  <Button leftIcon={<CloseIcon />} colorScheme="gray" variant="outline" onClick={() => setIsChangingPassword(false)}>
                    Cancel
                  </Button>
                )}
              </HStack>

              {isChangingPassword ? (
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={PasswordValidationSchema}
                  onSubmit={handleUpdatePassword}
                >
                  {({ errors, touched, isValid, dirty }) => (
                    <Form style={{ width: "100%" }}>
                      <VStack spacing={5} align="start" width="100%">
                        <FormControl isInvalid={errors.currentPassword && touched.currentPassword}>
                          <FormLabel htmlFor="currentPassword" color="white">
                            Current Password
                          </FormLabel>
                          <InputGroup>
                            <Field as={Input} id="currentPassword" name="currentPassword" type={showPassword ? "text" : "password"} color="white" />
                            <InputRightElement>
                              <Button size="sm" onClick={() => setShowPassword(!showPassword)} variant="ghost">
                                <Icon as={showPassword ? ViewOffIcon : ViewIcon} color="gray.300" />
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.newPassword && touched.newPassword}>
                          <FormLabel htmlFor="newPassword" color="white">
                            New Password
                          </FormLabel>
                          <InputGroup>
                            <Field as={Input} id="newPassword" name="newPassword" type={showNewPassword ? "text" : "password"} color="white" />
                            <InputRightElement>
                              <Button size="sm" onClick={() => setShowNewPassword(!showNewPassword)} variant="ghost">
                                <Icon as={showNewPassword ? ViewOffIcon : ViewIcon} color="gray.300" />
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword}>
                          <FormLabel htmlFor="confirmPassword" color="white">
                            Confirm New Password
                          </FormLabel>
                          <InputGroup>
                            <Field
                              as={Input}
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              color="white"
                            />
                            <InputRightElement>
                              <Button size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)} variant="ghost">
                                <Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} color="gray.300" />
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                        </FormControl>

                        <Button mt={4} colorScheme="red" isLoading={isLoading} type="submit" leftIcon={<CheckIcon />} isDisabled={!isValid || !dirty}>
                          Update Password
                        </Button>
                      </VStack>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Text color="gray.400">••••••••••••</Text>
              )}
            </VStack>
          </Box>

          {/* Theme Preferences */}
          <Box bg="var(--semi-dark-blue)" borderRadius="lg" p={6}>
            <VStack align="start" spacing={6} width="100%">
              <Heading as="h2" size="md" color="white">
                Theme Preferences
              </Heading>

              <HStack justifyContent="space-between" width="100%">
                <HStack>
                  <Icon as={colorMode === "dark" ? MoonIcon : SunIcon} color="white" />
                  <Text color="white">Dark Mode</Text>
                </HStack>
                <Switch colorScheme="red" isChecked={colorMode === "dark"} onChange={toggleColorMode} size="lg" />
              </HStack>
            </VStack>
          </Box>

          {/* Delete Account */}
          <Box bg="var(--semi-dark-blue)" borderRadius="lg" p={6}>
            <VStack align="start" spacing={6} width="100%">
              <Heading as="h2" size="md" color="white">
                Delete Account
              </Heading>

              <HStack justifyContent="space-between" width="100%">
                <Text color="gray.400">Once you delete your account, there is no going back. This action is permanent.</Text>
                <Button colorScheme="red" leftIcon={<DeleteIcon />} onClick={onDeleteAlertOpen}>
                  Delete Account
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteAlertOpen} leastDestructiveRef={cancelRef} onClose={onDeleteAlertClose}>
        <AlertDialogOverlay>
          <AlertDialogContent bg="var(--dark-blue)" color="white">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards. All your data including bookmarks will be permanently removed.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteAccount} ml={3} isLoading={isLoading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Layout>
  );
};
