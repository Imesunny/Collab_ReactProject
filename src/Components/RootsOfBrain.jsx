import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import bgImage3 from "../Images/BikePart9.jpg";

const RootsOfBrain = () => {
  return (
    <Box
      w={"90%"}
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
        bg={`url(${bgImage3}) no-repeat center`}
        bgPosition={"center"}
        bgSize="cover"
        // filter="brightness(0.9) contrast(0.8) saturate(1.5)"
      ></Box>
      <Box position="relative" zIndex={1}>
        <Heading my={"20px"}>
          ROOTS OF THE BRAIN
        </Heading>
        <Text mx={{ base: "5%", md: "10%" }}
          lineHeight={{ base: "25px", md: "35px" }}
          letterSpacing={"0.1em"}
          textShadow={"2px 5px 4px black"}
          color={"white"}>
          In 2002 we introduced a shock with a mind of its own, and
          revolutionized bicycle suspension. Integral to the winningest full
          suspension XC bikes ever, Brain technology has come a long way over
          the past two decades, but the all-new Brain is still in a class by
          itself when it comes to instantly and automatically adjusting
          suspension from firm to active to maximize efficiency and control.
        </Text>
        <Button variant='outline' colorScheme="yellow" my='20px' mx={{ base: "5%", md: "10%" }}>KNOW MORE</Button>
      </Box>
    </Box>
  );
};

export default RootsOfBrain;
