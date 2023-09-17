import React from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
// import Logo from "../Images/Mainlogo.png";
// import Footer_Logos from "../Images/Footer_Logos.png";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
      maxW={"100%"}
      bg={"rgb(28,28,28)"}
      px={"40px"}
      pt={"40px"}
      pb="60px"
      mt="50px"
    >
      <Flex pb={"90px"} gap="20px" textAlign={"left"} justify={"space-between"} direction={{ base: 'column', md: 'row' }} wrap={'wrap'}>
        <Box w={{ base: "50%", lg: "15%" }} _hover={{ cursor: "pointer" }} m='auto'>
          <Box>
            {/* <Image src={Logo} w={'100%'} /> */}
          </Box>
          <Box>
            {/* <Image src={Footer_Logos} /> */}
          </Box>
        </Box>
        <Flex className="middleFlex" gap="20px" wrap={'wrap'}>
          <Box>
            <h2>MOUNTAIN</h2>
            <ul>
              <li>Cross Country</li>
              <li>Downhill</li>
              <li>Dirt Jump</li>
              <li>Frames</li>
            </ul>
          </Box>
          <Box>
            <h2>ROAD</h2>
            <ul>
              <li>Performance</li>
              <li>Gravel</li>
              <li>Cyclocross</li>
              <li>Triathlon</li>
            </ul>
          </Box>
          <Box>
            <h2>ACTIVE</h2>
            <ul>
              <li>Fitness</li>
              <li>Transport</li>
              <li>Comfort</li>
            </ul>
          </Box>
          <Box>
            <h2>ELECTRIC</h2>
            <ul>
              <li>Road</li>
              <li>Mountain</li>
              <li>Active</li>
            </ul>
          </Box>
          <Box>
            <h2>KIDS</h2>
            <ul>
              <li>Toddler</li>
              <li>Little kids</li>
              <li>Big kids</li>
            </ul>
          </Box>
          <Box>
            <h2>CUSTOMERS</h2>
            <ul>
              <li>About us</li>
              <li>Delivery</li>
              <li>Payment</li>
              <li>Contact</li>
            </ul>
          </Box>
          <Box>
            <h2>SUPPORT</h2>
            <ul>
              <li>Support center</li>
              <li>Warranty</li>
              <li>Bike registration</li>
              <li>Shiping & Delivery</li>
            </ul>
          </Box>
        </Flex>
        <Box w={{ base: "90%", lg: "20%" }} m='auto' mt='10px' className="newsletterfooter">
          <Text fontWeight={800}>NEWSLETTER</Text>
          <InputGroup my={"20px"}>
            <Input type="tel" placeholder="join our newsletter" focusBorderColor='white'/>
            <InputRightAddon
              children="JOIN"
              bg={"grey"}
              _hover={{ cursor: "pointer" }}
            />
          </InputGroup>
          <Text fontSize={"sm"}>
            By submitting your email address you agree to the{" "}
            <Text as="u" _hover={{ cursor: "pointer" }}>
              Terms & Conditions
            </Text>
          </Text>
        </Box>
      </Flex>
      <Text className="footerlast">
        © 1997 - 2023. Specialized Bicycle Components, Inc. All Rights Reserved
      </Text>
    </Box>
  );
};

export default Footer;
