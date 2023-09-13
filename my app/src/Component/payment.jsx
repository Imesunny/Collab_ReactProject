import React from "react"
import { Box, Container, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputLeftElement, Wrap, WrapItem } from "@chakra-ui/react"
import { BsPerson, BBsPhone, BsPin } from 'react-icons/bs'
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdLocationCity,
  MdOutlineLocationCity,
  MdLocationPin,
} from 'react-icons/md'


const Payment = () => {
  return (
    <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
    <Box     bg="#02054B"
               color="white"
               borderRadius="lg"
               m={{ sm: 4, md: 16, lg: 10 }}
               p={{ sm: 5, md: 5, lg: 16 }}
               >
    <Flex direction={['column','row','row']}>
    <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }} >
    <Box>
      <WrapItem>
        <Box w={'80%'}>
          <Heading>Form1</Heading>
          <FormControl>
          <FormControl id="name" >
              <FormLabel>Your Name</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <BsPerson color="gray.800" />
                </InputLeftElement>
                <Input type="text" size="md" name="name" required />
              </InputGroup> 
            </FormControl> 
            <FormControl id="name" >
              <FormLabel>Mail</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputLeftElement>
                <Input type="email" size="md" name="email" required />
              </InputGroup>
            </FormControl> 
            <FormControl id="name" >
              <FormLabel>Address</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <MdLocationPin color="gray.800" />
                </InputLeftElement>
                <Input type="text" size="md" name="address" required />
              </InputGroup> 
            </FormControl> 
            <FormControl id="name" >
              <FormLabel>City</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <MdOutlineLocationCity color="gray.800" />
                </InputLeftElement>
                <Input type="text" size="md" name="city" required />
              </InputGroup> 
            </FormControl>
            <Flex>
              <Flex>
                <FormControl id="name" >
                <FormLabel>State</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineLocationCity color="gray.800" />
                  </InputLeftElement>
                  <Input type="text" size="md" name="state" required />
                </InputGroup> 
                </FormControl>
              </Flex>
              <Flex>
                <FormControl id="name" >
                <FormLabel>Pincode</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <BsPin color="gray.800" />
                  </InputLeftElement>
                  <Input type="number" size="md" name="pincode" required />
                </InputGroup> 
                </FormControl>
              </Flex>
            </Flex>
          </FormControl>
          </Box>
      </WrapItem>
    </Box>
    </Wrap>
    <Wrap>
    <Box>
      <WrapItem>
          <Box w={'80%'}>
          <Heading>Form1</Heading>
          <FormControl>
          <FormControl id="name" >
              <FormLabel>Your Name</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <BsPerson color="gray.800" />
                </InputLeftElement>
                <Input type="text" size="md" name="name" required />
              </InputGroup> 
            </FormControl> 
            <FormControl id="name" >
              <FormLabel>Mail</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputLeftElement>
                <Input type="email" size="md" name="email" required />
              </InputGroup>
            </FormControl> 
            <FormControl id="name" >
              <FormLabel>Address</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <MdLocationPin color="gray.800" />
                </InputLeftElement>
                <Input type="text" size="md" name="address" required />
              </InputGroup> 
            </FormControl> 
            <FormControl id="name" >
              <FormLabel>City</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <MdOutlineLocationCity color="gray.800" />
                </InputLeftElement>
                <Input type="text" size="md" name="city" required />
              </InputGroup> 
            </FormControl>
            <Flex>
              <Flex>
                <FormControl id="name" >
                <FormLabel>State</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineLocationCity color="gray.800" />
                  </InputLeftElement>
                  <Input type="text" size="md" name="state" required />
                </InputGroup> 
                </FormControl>
              </Flex>
              <Flex>
                <FormControl id="name" >
                <FormLabel>Pincode</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <BsPin color="gray.800" />
                  </InputLeftElement>
                  <Input type="number" size="md" name="pincode" required />
                </InputGroup> 
                </FormControl>
              </Flex>
            </Flex>
          </FormControl>
          </Box>
      </WrapItem>
    </Box>
    </Wrap>
    </Flex>
    </Box>
    </Container>
  )
}

export default Payment

