import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  CSSReset,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import background from './1.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const[alart,setAlert]=useState("")

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.confirmPassword !== formData.password) {
      setAlert("Password does not match");
      setShowSuccessMessage(true);
    } else {
      try {
        // Check if the email already exists
        const emailExists = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
  
        // Check if the phone number already exists
        const phoneNumberExists = await axios.get(`http://localhost:3000/users?phoneNumber=${formData.phoneNumber}`);
  
        if (emailExists.data.length > 0) {
          // Email already exists, show an error toast
          setAlert("Email already exists. Please use a different email.");
          setShowSuccessMessage(true);
        } else if (phoneNumberExists.data.length > 0) {
          // Phone number already exists, show an error toast
          setAlert("Phone number already exists. Please use a different phone number.");
          setShowSuccessMessage(true);
        } else {
          // Email and phone number don't exist, proceed with registration
          await axios.post("http://localhost:3000/users", formData);
          setAlert("Sign up successful!");
          setShowSuccessMessage(true);
        }
      } catch (error) {
        // Handle any other errors here
        console.error(error);
      }
    }
  };
  

  const nav = useNavigate();

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          p={4}
          bg="rgba(100, 100, 100, .9)"
          borderRadius={4}
          color="white"
          className="main_box"
          width="50%"
          minW="60vh"
        >
          <Box textAlign="center">
            <Heading color="#C68409">Sign Up</Heading>
          </Box>
          {showSuccessMessage && (
            <Alert status="success" mb={4}mt={4} bg='orange'>
              <AlertIcon />
              <AlertTitle>{alart}</AlertTitle>
              <CloseButton onClick={() => setShowSuccessMessage(false)} />
            </Alert>
          )}
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Flex justify="space-between" mb={2}>
                <FormControl mr={4}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl ml={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                </Flex>
                <Flex justify="space-between" mb={2}>
                <FormControl mr={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl ml={4}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                </Flex>
                <Flex justify="space-between" mb={2}>
                <FormControl mr={4}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl ml={4}>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    name="country"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                </Flex >
                <Flex justify="space-between" mb={2}>
                <FormControl mr={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl ml={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                </Flex>
               
               
                
                <Center  mb={4}>
                  <Button
                    type="submit"
                    bg="red"
                    color="white"
                    _hover={{ bg: 'gray' }}
                    _active={{ bg: 'purple' }}
                    width={200}
                  >
                    Sign Up
                  </Button>
                </Center>
              </Stack>
            </form>
            <Center
              onClick={() => nav('/login')}
              _hover={{ bg: 'gray' }}
              _active={{ bg: 'purple' }}
            >
              Already have an account? Log in here.
            </Center>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Signup;
