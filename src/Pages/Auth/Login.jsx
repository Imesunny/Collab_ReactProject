import React, { useState } from 'react'
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
  CloseButton,
  AlertTitle,
  AlertIcon,
  Alert,
  Flex, // Import Center component
} from '@chakra-ui/react';
import background from './1.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const nav=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setShowErrorMessage(true);
      setErrorText('Email required');
      return;
    }
    if (!password) {
      setShowErrorMessage(true);
      setErrorText('Password are required');
      return;
    }


    try {
      // Check if the email exists
      const emailExistsResponse = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );

      if (emailExistsResponse.data.length === 0) {
        setShowErrorMessage(true);
        setErrorText('User not found');
        return;
      }

      // Check if the password matches
      const user = emailExistsResponse.data[0];
      if (user.password !== password) {
        setShowErrorMessage(true);
        setErrorText('Password does not match');
        return;
      }

      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      setErrorText('');
      // Save user data here if needed
      console.log('User data:', user);
    } catch (error) {
      console.error('Login error:', error);
      setShowErrorMessage(true);
      setErrorText('Login failed. Please try again.');
    }
  };
  return (
    <ChakraProvider >
      <CSSReset />
      <Box style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover', // Adjust this property as needed
        backgroundRepeat: 'no-repeat', // Adjust this property as needed
        backgroundPosition: 'center', // Adjust this property as needed
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
          color='white'
          className='main_box'
          width='40%'
          minW="40vh"

        >
          <Box textAlign="center">
            <Heading color="#C68409">Login</Heading>
          </Box>
          {showErrorMessage && (
            <Alert status="error" mt={9} backgroundColor='red'>
              <AlertIcon />
              <AlertTitle>{errorText}</AlertTitle>
              <CloseButton onClick={() => setShowErrorMessage(false)} />
            </Alert>
          )}
          {showSuccessMessage && (
            <Alert status="success" mt={4} backgroundColor='green'>
              <AlertIcon />
              <AlertTitle >Login successful!</AlertTitle>
              <CloseButton onClick={() => setShowSuccessMessage(false)} />
            </Alert>
          )}
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter your email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter your password" 
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}/>
                </FormControl>
                <Center> {/* Wrap the button with the Center component */}
                  <Button
                    type="submit"
                    bg="red"
                    color="white"
                    _hover={{ bg: 'gray' }}
                    _active={{ bg: 'purple' }}
                    width={200}
                  >
                    Log in
                  </Button>

                </Center>
                <Center _hover={{ bg: 'gray' }}
                  _active={{ bg: 'purple' }}>
                  Forgot your Password
                </Center>
                <Center>
                 <Flex flexDir='column'><div>Do not have an Account ?</div><button
                onClick={()=> nav("/signup")} style={{color:'orange'}}> Create yours now.</button></Flex> </Center>


              </Stack>
            </form>
          </Box>
        </Box>
      </Box>

    </ChakraProvider>
  )
}

export default Login
