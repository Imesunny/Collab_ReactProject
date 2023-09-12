import React from 'react'
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
  Center, // Import Center component
} from '@chakra-ui/react';
import background from './1.jpg';
import { useNavigate } from 'react-router-dom';


const Login = () => {


  const nav=useNavigate()
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
          width='30%'
          minW="40vh"

        >
          <Box textAlign="center">
            <Heading color="#C68409">Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email or Username</FormLabel>
                  <Input type="text" placeholder="Enter your email or username" />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter your password" />
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
                  Forgot your PassWord
                </Center>
                <Center
                onClick={()=> nav("/signup")}
                 _hover={{ bg: 'gray' }}
                  _active={{ bg: 'purple' }}>Do not have an Account? Create yours now.</Center>


              </Stack>
            </form>
          </Box>
        </Box>
      </Box>

    </ChakraProvider>
  )
}

export default Login
