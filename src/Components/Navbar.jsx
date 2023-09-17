import {
    Box,
    Image,
    Show,
    Flex,
    HStack,
    Hide,
    InputGroup,
    Input,
    InputRightAddon,
    Spacer,
    Text,
    MenuButton,
    Button,
    Menu,
    MenuList,
    MenuItem,
    useDisclosure,
    Avatar,
    MenuDivider,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useToast,
    Divider,
  } from "@chakra-ui/react";
  import React, { useEffect, useRef, useState } from "react";
  import Logo from "../Images/Mainlogo.png";
  import {
    EmailIcon,
    PhoneIcon,
    Search2Icon,
  } from "@chakra-ui/icons";
  import wishIcon from "../Images/Wishlist icon.png";
  import cartIcon from "../Images/CartIcon.png";
  import accountIcon from "../Images/AccountIcon.png";
  import "./Navbar.css";
  import MenuBtn from "./MenuBtn";
  import { useDispatch, useSelector } from "react-redux";
  import {
    debouncingFunction,
    getCartProducts,
    getCurrentUser,
    getWishList,
    logOutUser,
    resetDebouncing,
  } from "../Redux/action";
  import { Link, useNavigate } from "react-router-dom";
  
  const Navbar = () => {
    const navigate = useNavigate();
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const cartReducer = useSelector((store) => {
      return store.cartReducer;
    });
    const wishReducer = useSelector((store) => {
      return store.wishReducer;
    });
    const currUser = useSelector((store) => {
      return store.accountReducer.currUser;
    });
    // console.log("curruser", currUser);
    const number = cartReducer.cartProducts.length;
    const wishNumber = wishReducer.WishProducts.length;
    // console.log(wishNumber);
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
    const btnRef = useRef();
  
    const handleLogout = () => {
      setIsLogoutAlertOpen(true);
    };
  
    const cancelLogout = () => {
      setIsLogoutAlertOpen(false);
    };
  
    const toast = useToast();
  
    const confirmLogout = () => {
      setIsLogoutAlertOpen(false);
      onClose();
      dispatch(logOutUser);
      toast({
        title: "LOGOUT SUCCESSFULL",
        status: "success",
        position: "top-left",
        isClosable: true,
      });
    };
  
    const [searchQuery, setSearchQuery] = useState("");
    const timeout = useRef(null);
    const debouncingProducts = useSelector((store) => {
      return store.productsReducer.debouncingArr;
    });
    // console.log(debouncingProducts);
    // Debouncing
    const handleSearch = (e) => {
      const value = e.target.value;
        setSearchQuery(value)
    };
  
    useEffect(() => {
      timeout.current = setTimeout(() => {
        if(searchQuery !== ""){
          dispatch(debouncingFunction(searchQuery));
        }
      }, 500);
      return ()=>{
        clearTimeout(timeout.current);
      }
    }, [searchQuery]);
  
  
    useEffect(() => {
      dispatch(getCartProducts);
      dispatch(getWishList);
    }, []);
  
  
    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);
    const handleClick = (event) => {
       dispatch(resetDebouncing)
      // alert('Clicked!');
    };
  
  
    useEffect(() => {
      const userEmail = JSON.parse(localStorage.getItem("userEmail"));
      if (userEmail) {
        console.log(userEmail)
        let currUser = { email : userEmail };
        getCurrentUser(currUser, dispatch);
      }
    }, []);
    return (
      <>
        <Box
          maxW={"100%"}
          bg={"rgb(28,28,28)"}
          // m={"auto"}
          h={["55px", "55px", "65px", "65px", "65px", "65px"]}
          position={"sticky"}
          top={0}
          zIndex={"1000"}
          // border={'1px solid red'}
        >
          <Flex align={"center"} mx={"20px"}>
            {/* Hidden menu */}
            <Box position="relative" ml={"10px"}>
              <Show below="lg">
                <MenuBtn
                  cartNumber={number}
                  currUser={currUser}
                  wishNumber={wishNumber}
                />
              </Show>
            </Box>
            {/* <Spacer /> */}
  
            {/* LogoBox */}
            <Box ml={"20px"} w={"120px"} mr={"10px"}>
              <Link to="/">
                <Image maxW={"100%"} src={Logo} py={"5px"} />
              </Link>
            </Box>
  
            {/* Categories */}
            <Box>
              <Hide below="md">
                <HStack color={"white"} spacing="10px">
                  <Link
                    to="/productPage"
                    className="categories"
                    _hover={{ underLine: "none" }}
                  >
                    MOUNTAIN
                  </Link>
                  <Link
                    to="/productPage"
                    className="categories"
                    _hover={{ underLine: "none" }}
                  >
                    ROAD
                  </Link>
                  <Link
                    to="/productPage"
                    className="categories"
                    _hover={{ underLine: "none" }}
                  >
                    ACTIVE
                  </Link>
                  <Link
                    to="/productPage"
                    className="categories"
                    _hover={{ underLine: "none" }}
                  >
                    ELECTRIC
                  </Link>
                  <Link
                    to="/productPage"
                    className="categories"
                    _hover={{ underLine: "none" }}
                  >
                    KIDS
                  </Link>
                </HStack>
              </Hide>
            </Box>
            <Spacer />
  
            {/* Search Box */}
            <Box mx={[null, "sm", "md", "lg", "xl", "2xl"]} pt="5px">
              <InputGroup borderRadius={"20px"}>
                <Input
                  className="searchInput"
                  focusBorderColor="none"
                  placeholder="Search"
                  // h={{sm:"2px"}}
                  size={["sm", "sm", "sm", "sm", "xl", "2xl"]}
                  w={["150px", "250px", "200px", "200px", "320px", "400px"]}
                  style={{
                    fontSize: "small",
                    outline: "none",
                    border: "0.13rem solid white",
                    paddingLeft: "15px",
                    paddingRight: "50px",
                    background: "black",
                    color: "white",
                    //   width: "400px",
                    borderRadius: "20px",
                  }}
                  onChange={handleSearch}
                />
                <InputRightAddon
                  zIndex="1"
                  // as={"Button"}
                  ml={"-50px"}
                  mt={["-4px", null, null, "-3px", "-3px", "1px"]}
                  // mr={['-2px', null, null,'-8px','-3px','4px']}
                  border={"none"}
                  borderRadius={"20px"}
                  bg={"none"}
                  color={"grey"}
                >
                  <Search2Icon />
                </InputRightAddon>
              </InputGroup>
              <Box
                position="absolute"
                top="50px"
                bg="rgb(38,38,38)"
                borderRadius='10px'
                w={["150px", "250px", "200px", "200px", "320px", "400px"]}
                color="white"
                px={"10px"}
              >
                {debouncingProducts.length > 0 && searchQuery &&
                  debouncingProducts?.map((ele) => {
                    return (
                      <>
                        <Text _hover={{ cursor: "pointer" }} my={"5px"} onClick={(e)=>{navigate(`/productPage/details/${ele._id}`)}}>
                          {ele.name}
                        </Text>
                        <Divider />
                      </>
                    );
                  })}
              </Box>
            </Box>
            <Spacer />
  
            <Hide below="lg">
              <Box mr={"20px"}>
                <HStack spacing={"10px"}>
                  <Link to="/wishlist">
                    <Text
                      position={"absolute"}
                      ml={"33px"}
                      color={"white"}
                      bg={"red.500"}
                      borderRadius={"15px"}
                      px={"3px"}
                    >
                      {wishNumber > 0 && <span>{wishNumber}</span>}
                    </Text>
                    <Image
                      src={wishIcon}
                      alt="wishIcon"
                      color={"white"}
                      w={"40px"}
                    />
                  </Link>
                  <Link to="/cart">
                    <Text
                      position={"absolute"}
                      ml={"75px"}
                      color={"white"}
                      bg={"yellow.500"}
                      borderRadius={"15px"}
                      px={"3px"}
                    >
                      {number > 0 && <span>{number}</span>}
                    </Text>
                    <Image
                      src={cartIcon}
                      alt="cartIcon"
                      color={"white"}
                      w={"80px"}
                      pt="5px"
                    />
                  </Link>
                  <Link>
                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton>
                            <Image
                              isActive={isOpen}
                              src={accountIcon}
                              alt="accountIcon"
                              color={"white"}
                              w={"40px"}
                              pt={"8px"}
                            />
                          </MenuButton>
                          <MenuList
                            p={"10px"}
                            bg={"rgb(38,38,38)"}
                            color={"white"}
                            textAlign={"center"}
                            border={"none"}
                            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, white 0px 1px 3px 1px"
                          >
                            {Object.keys(currUser).length === 0 ? (
                              <>
                                <MenuItem
                                  bg={"yellow.500"}
                                  borderRadius={"5px"}
                                  color={"black"}
                                >
                                  YOU ARE NOT LOGGED IN
                                </MenuItem>{" "}
                                <MenuDivider />
                                <MenuItem
                                  bg={"rgb(38,38,38)"}
                                  _hover={{ bg: "red" }}
                                  borderRadius={"10px"}
                                >
                                  <Link to="/login">
                                    <Text w="100%" px={"20px"}>
                                      SIGN IN / SIGN UP
                                    </Text>
                                  </Link>
                                </MenuItem>
                                {/* <br /> */}
                                {/* <MenuItem bg={'rgb(38,38,38)'} _hover={{bg:"red"}} borderRadius={'10px'}>
                               <Link to="/signup">
                                  <Text w='100%' _hover={{bg:"red"}} px={'60px'} >SIGN UP </Text>
                                </Link>
                                <br />
                              </MenuItem> */}
                              </>
                            ) : (
                              <Box borderRadius={"10px"} maxW="300px">
                                <Text py={"5px"}>ACCOUNT</Text> <MenuDivider />
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
                                  mt={"10px"}
                                  onClick={() => {
                                    handleLogout();
                                    navigate("/");
                                  }}
                                >
                                  LOGOUT
                                </Button>
                              </Box>
                            )}
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </Link>
                </HStack>
              </Box>
            </Hide>
          </Flex>
        </Box>
  
        {/* White line */}
        <Box
          position={"sticky"}
          zIndex={200}
          top={["55px", "55px", "65px", "65px", "65px", "65px"]}
          bg="white"
          maxW={"100%"}
          h={"0.6px"}
          mx={["10px", "20px", "30px", "40px"]}
        ></Box>
  
        {/* navBelow */}
        <Box
          maxW={"100%"}
          h={["35px", "40px", "45px"]}
          position={"sticky"}
          top={["56px", "56px", "66px", "66px", "66px", "66px"]}
          //   border="1px solid white"
          zIndex={"100"}
          bgGradient="linear(rgb(28,28,28) 30%, rgb(32,26,14) 15%, rgb(32,26,14) 0%)"
        >
          <HStack
            color="grey"
            justify={"flex-end"}
            mx={"40px"}
            spacing={"15px"}
            className="navBelow"
          >
            <Link className="navBelowLink" _hover={{ underLine: "none" }}>
              About us
            </Link>
            <Link className="navBelowLink" _hover={{ underLine: "none" }}>
              Delivery
            </Link>
            <Link className="navBelowLink" _hover={{ underLine: "none" }}>
              Payment
            </Link>
            <Link className="navBelowLink" _hover={{ underLine: "none" }}>
              Contact
            </Link>
          </HStack>
        </Box>
        {/* Logout Alert */}
        <AlertDialog
          isOpen={isLogoutAlertOpen}
          leastDestructiveRef={btnRef}
          onClose={cancelLogout}
          size={{ base: "xs", md: "md" }}
        >
          <AlertDialogOverlay />
          <AlertDialogContent bg="rgb(28,28,28)">
            <AlertDialogHeader color="white">Confirm Logout</AlertDialogHeader>
            <AlertDialogBody color="white">
              Are you sure you want to log out?
            </AlertDialogBody>
            <AlertDialogFooter gap={"10px"}>
              <Button colorScheme="red" onClick={confirmLogout}>
                Logout
              </Button>
              <Button ref={btnRef} onClick={cancelLogout}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };
  
  export default Navbar;
  