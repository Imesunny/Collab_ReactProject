import { AddIcon, EmailIcon, HamburgerIcon, MinusIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Menu,
  MenuButton,
  Box,
  Spacer,
  useDisclosure,
  Button,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../Redux/action";

const MenuBtn = ({ cartNumber, currUser, wishNumber }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setIsLogoutAlertOpen(true);
  };

  const cancelLogout = () => {
    setIsLogoutAlertOpen(false);
  };

  const confirmLogout = () => {
    setIsLogoutAlertOpen(false);
    onClose();
    dispatch(logOutUser);
  };

  const handleGoToProducts = ()=>{
    navigate("/productPage");
    onClose();
  }

  return (
    <Menu border="1px solid red">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        colorScheme="black"
        color={"white"}
        size={["sm", "sm", "md", "lg", "xl", "2xl"]}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="rgb(28,28,28)">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Menu</DrawerHeader>

          <DrawerBody color="white">
            <Accordion allowMultiple w="100%" as="button">
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton as="flex" outline="none">
                        <Box>Account</Box> <Spacer />
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel textAlign="left" p={"0"}>
                      {Object.keys(currUser).length === 0 ? (
                        <Box py={"20px"}>
                          <Button
                            w="100%"
                            borderRadius={"10"}
                            variant="outline"
                            colorScheme="facebook"
                            onClick={() => {
                              navigate("/login");
                              onClose();
                            }}
                          >
                            SIGN IN
                          </Button>
                          <br />
                          {/* <Button leftIcon={<PhoneIcon />} w="100%" borderRadius={'0'} colorScheme='facebook'>9764584028</Button> */}
                          <Button
                            w="100%"
                            borderRadius={"10"}
                            variant="outline"
                            colorScheme="facebook"
                            onClick={() => {
                              navigate("/login");
                              onClose();
                            }}
                          >
                            SIGN UP
                          </Button>
                          <br />
                        </Box>
                      ) : (
                        <Box py={"20px"}>
                          <Button
                            leftIcon={<Avatar size={"xs"} bg="blue.600" />}
                            w="100%"
                            borderRadius={"10px 10px 0 0"}
                            variant="outline"
                            colorScheme="facebook"
                          >
                            {currUser.firstName + " " + currUser.lastName}
                          </Button>
                          <br />
                          <Button
                            leftIcon={<PhoneIcon />}
                            w="100%"
                            borderRadius={"0"}
                            colorScheme="facebook"
                          >
                            {currUser.contact}
                          </Button>
                          <Button
                            leftIcon={<EmailIcon />}
                            w="100%"
                            borderRadius={"0"}
                            variant="outline"
                            colorScheme="facebook"
                          >
                            {currUser.email}
                          </Button>
                          <br />
                          <Button
                            w="100%"
                            colorScheme="red"
                            borderRadius={"10"}
                            my={"10px"}
                            onClick={handleLogout}
                          >
                            LOGOUT
                          </Button>
                        </Box>
                      )}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
              <AccordionItem
                _hover={{
                  backgroundColor: "blue.600",
                  borderRadius: "10px",
                  color: "black",
                }}
              > <Link to='/cart'>
                <Button variant={"unstyled"} w={"100%"}>
                  Cart<span> ({cartNumber > 0 && <span>{cartNumber}</span>})</span>
                </Button>
                </Link>
              </AccordionItem>
              <AccordionItem
                _hover={{
                  backgroundColor: "blue.600",
                  borderRadius: "10px",
                  color: "black",
                }}
              >  <Link to="/wishlist">
                <Button variant={"unstyled"} w={"100%"}>
                  Wishlist<span> ({wishNumber > 0 && <span>{wishNumber}</span>})</span>
                </Button>
                </Link>
              </AccordionItem>
            </Accordion>
            <Flex direction={"column"} my={"20px"}>
              <Button colorScheme="facebook" variant="ghost" onClick={handleGoToProducts}>
                MOUNTAIN
              </Button>
              <Button colorScheme="facebook" variant="ghost" onClick={handleGoToProducts}>
                ROAD
              </Button>
              <Button colorScheme="facebook" variant="ghost" onClick={handleGoToProducts}>
                ACTIVE
              </Button>
              <Button colorScheme="facebook" variant="ghost" onClick={handleGoToProducts}>
                ELECTRIC
              </Button>
              <Button colorScheme="facebook" variant="ghost" onClick={handleGoToProducts}>
                KIDS
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <AlertDialog
        isOpen={isLogoutAlertOpen}
        leastDestructiveRef={btnRef}
        onClose={cancelLogout}
        size={{base:'xs', md:'md'}}
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg="rgb(28,28,28)">
          <AlertDialogHeader color="white">
            Confirm Logout
          </AlertDialogHeader>
          <AlertDialogBody color="white">
            Are you sure you want to log out?
          </AlertDialogBody>
          <AlertDialogFooter gap={'10px'}>
            <Button colorScheme="red" onClick={confirmLogout}>
              Logout
            </Button>
            <Button ref={btnRef} onClick={cancelLogout}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Menu>
  );
};

export default MenuBtn;
