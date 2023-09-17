import React from 'react';
import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import BikeImage1 from "../Images/BikeImage1.jpg";
import { useNavigate } from 'react-router-dom';

const Bikediv2 = () => {

   const navigate = useNavigate()

    return (
        <Box
      maxW={"100%"}
      my={{ base: "50px", md: "50px" }}
      bg={"#262626"}
      boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
    >
      <Flex direction={{ base: "column", md: "row" }}>
        <Img src={BikeImage1} w={{ base: "100%", md: "50%" }}  />
        <Box
           w={{ base: "100%", md: "50%" }}
           p={"20px"}
           textAlign={"left"}
           ml="20px"
        >
          <Heading my={"20px"} fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
            EMBRACE THE FREEDOM <br /> OF TWO WHEELS
          </Heading>
          <Text
            style={{ wordSpacing: "0.2em" }}
            letterSpacing={"0.1em"}
            my={"20px"}
          >
            Find Your Perfect Bike
          </Text>
          <Button variant={"outline"} colorScheme="blue" onClick={()=>navigate("/productPage")}>
            Shop Now
          </Button>
        </Box>
      </Flex>
    </Box>
    );
};

export default Bikediv2;