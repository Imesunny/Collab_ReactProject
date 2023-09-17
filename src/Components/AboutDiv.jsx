import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import pexels from "../Images/pexels-photo-258045.jpeg";


const AboutDiv = () => {
  return (
    <Box
      w={"90%"}
      p={{ base: "3%", md: "5%" }}
      m={"auto"}
      textAlign={"left"}
      position={"relative"}
      // boxShadow="#C68409 0px 5px 15px"
      // boxShadow="#262626 0px 5px 15px"
      borderRadius={"20px"}
    >
      <Box
      borderRadius={"20px"}
        position="absolute" // Position absolute to layer the background image
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={`url(${pexels}) no-repeat center`}
        bgPosition={"center"}
        bgSize="cover"
        filter="brightness(0.9) contrast(0.8) saturate(1.5)"
      ></Box>

      <Box position="relative" zIndex={1}>
        <Heading my={"20px"}>ABOUT</Heading>
        <Text
          mx={{ base: "5%", md: "10%" }}
          lineHeight={{ base: "25px", md: "35px" }}
          letterSpacing={"0.1em"}
          textShadow={"2px 5px 4px black"}
          color={"white"}
        >
          We are riders-that fact has guided our every decision since
          <Text as={"span"} color="red">
            1974
          </Text>
          . When quality tires weren't around, we strove to make the best. When
          people wanted to ride cruisers in the dirt, we made the first
          production mountain bike. When roadies wanted to go faster, we
          doubled-down on carbon and built our own wind tunnel. And when we saw
          kids struggling to focus in school, we began supporting Outride to
          help promote better health through cycling.
        </Text>
      </Box>
    </Box>
  );
};

export default AboutDiv;
