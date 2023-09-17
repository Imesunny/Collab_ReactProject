import React from 'react';
import { Box,Heading,Text } from "@chakra-ui/react";

const Bikediv3 = ({HeadingText, paraGraph, image}) => {
    return (
        <Box
      w={"100%"}
      p={{ base: "3%", md: "5%" }}
      m={"auto"}
      textAlign={"left"}
      position={"relative"}
      borderRadius={"20px"}
    >
      <Box
        borderRadius={"20px"}
        position="absolute" // Position absolute to layer the background image
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={`url(${image}) no-repeat center`}
        bgPosition={"center"}
        bgSize="cover"
        filter="brightness(1) contrast(1) saturate(0.9)"
      ></Box>
      <Box position="relative" zIndex={1}>
        <Heading my={"20px"}>
          {HeadingText}
        </Heading>
        <Text mx={{ base: "5%", md: "10%" }}
          lineHeight={{ base: "25px", md: "35px" }}
          letterSpacing={"0.1em"}
          textShadow={"2px 5px 4px black"}
          color={"white"}>
          {paraGraph}
        </Text>
        </Box>
    </Box>
    );
};

export default Bikediv3;