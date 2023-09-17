import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Divider,
  IconButton,
  Input,
  Image,
  Icon,
  Stack,
  useToast,
  Heading,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  AddIcon,
  MinusIcon,
  SettingsIcon,
  WarningTwoIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { TbTruckDelivery } from "react-icons/tb";
import { BsCreditCard2Back } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  decCartQuantity,
  deleteCartProduct,
  getCartProducts,
  incCartQuantity,
} from "../../Redux/action";
import Breadcrumbs from "../../Components/Breadcrumb";
import { useNavigate } from "react-router-dom";
// import EmptyCartImage from "../../Images/empty_cart.png";

const CartPage = () => {
  const [totalBill, setTotalBill] = useState(0);

  const cartItems = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  // console.log(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts);
  }, [dispatch]);

  const increaseQuantity = (id) => {
    dispatch(incCartQuantity(id));
  };
  const decreaseQuantity = (id) => {
    dispatch(decCartQuantity(id));
  };
  const toast = useToast();
  const removeFromCart = (id) => {
    dispatch(deleteCartProduct(id));
    toast({
      title: "Removed from the Cart",
      status: "error",
      position: "top-left",
      isClosable: true,
    });
  };

  const calTotal = () => {
    let total = cartItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    setTotalBill(total);
  };

  useEffect(() => {
    calTotal();
  }, [cartItems]);

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Box mt="30px">
        <Breadcrumbs />
        <Box w="50%" m="auto" mb={"20px"} color="white">
          {/* <Image src={EmptyCartImage} w="100%" /> */}
          <Heading mt={"-50px"}>
            Your cart is <span style={{ color: "red" }}>Empty!</span>
          </Heading>
          <Text my={"10px"}>
            Looks like you have not added anything to your cart. Go ahead &
            explore top categories.
          </Text>
          <Button colorScheme="red" onClick={() => navigate("/productPage")}>
            Return To Shop
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={4} bgColor={"#262626"} mt={"20px"}>
      <Breadcrumbs />
      <Box>
        <Text fontSize="4xl" mb={4} color="white" fontWeight="bold">
          YOUR ORDER
        </Text>
        <Flex direction={"column"} gap="15px">
          {cartItems?.map((item) => (
            //  <Center >
            <Flex
              key={item._id}
              h={{ base: null, md: "150px" }}
              direction={{ base: "column", md: "row" }}
              align={"center"}
              // border={"1px solid red"}
              borderRadius={"10px"}
              justifyContent="space-between"
              w={{ base: "95%", sm: "90%", md: "90%", lg: "80%", xl: "70%" }}
              m="auto"
              py={"10px"}
              px={{ base: "5px", md: "20px" }}
              bgColor={"#f3f0f3"}
              gap={{ base: "10px", md: "null" }}
            >
              <Box
                // border={"1px solid green"}
                // w="60%"
                onClick={()=>navigate(`/productPage/details/${item._id}`)}
                _hover={{cursor:'pointer'}}
                h={{ base: null, md: "150px" }}
              >
                <Flex align={"center"}>
                  <Box
                    border={"1px solid grey"}
                    borderRadius={"10px"}
                    w={{ base: "50%", md: "40%", lg: "30%" }}
                    h={{ base: null, md: "130px" }}
                    m="auto"
                    mt={{ base: null, md: "10px" }}
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      p={{ base: "1px", md: "10px" }}
                      width={"100%"}
                      marginRight="8px"
                    />
                  </Box>
                  <Flex
                    w={{ base: "50%", md: "55%", lg: "65%" }}
                    m={"auto"}
                    direction={"column"}
                    textAlign={"left"}
                    pl={"10px"}
                    gap={{ base: "0.2em", sm: "0.5em" }}
                    // border={'1px solid yellow'}
                  >
                    <Text fontWeight="bold" color="black">
                      {item.name}
                    </Text>
                    <Flex
                      direction={"row"}
                      gap="6px"
                      mr={{ base: "10px", sm: "40px", lg: "100px" }}
                      fontSize={"xs"}
                    >
                      <Text mt={"-4px"} color="grey">
                        {item.discount * 10}
                      </Text>
                      <Text mt="-3px" color={item.discount < 10 ? "red" : "green"}>
                        {item.discount < 10 ? "Only few Left" : "In Stocks"}
                      </Text>
                      {item.discount < 10 ? (
                        <Icon color="red" as={WarningTwoIcon} />
                      ) : (
                        <Icon color={"green"} as={CheckCircleIcon} />
                      )}
                    </Flex>
                    <Flex>
                      <Text as="del" color={"grey"}>
                        €{Math.floor(item.price + (item.price / 100) * item.discount)}
                      </Text>
                      <Text
                        color={"white"}
                        fontSize={"xs"}
                        borderRadius={"5px"}
                        ml="5px"
                        py="2px"
                        px={"5px"}
                        bg={"red.500"}
                      >
                        {item.discount}%off
                      </Text>
                    </Flex>
                    <Box>
                      <Text>€{item.price}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              <Flex
                alignItems="center"
                // border={"1px solid red"}
              >
                <IconButton
                  colorScheme="gray"
                  _hover={{ bgColor: "#f3f0f3" }}
                  bgColor="#f3f0f3"
                  onClick={() => decreaseQuantity(item._id)}
                  disabled={item.quantity === 1}
                >
                  <MinusIcon />
                </IconButton>
                <Input
                  // type="number"
                  w="50px"
                  // margin={2}
                  textAlign="center"
                  value={item.quantity}
                  // readOnly
                  isReadOnly
                  border={"#f3f0f3"}
                  _hover={{ bgColor: "#f3f0f3" }}
                />
                <IconButton
                  colorScheme="gray"
                  _hover={{ bgColor: "#f3f0f3" }}
                  bgColor="#f3f0f3"
                  onClick={() => increaseQuantity(item._id)}
                  disabled={item.quantity === 10}
                >
                  <AddIcon />
                </IconButton>
                <Flex mx={"10px"}>
                  <Text mr={"2px"}>€ </Text>
                  <Text>{item.quantity * item.price}</Text>
                </Flex>
                <IconButton
                  ml={"20px"}
                  colorScheme="red"
                  onClick={() => removeFromCart(item._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Flex>
            </Flex>

            //    </Center>
          ))}
        </Flex>
        <Divider my={8} borderColor="white" />
      </Box>
      <Box>
        <Stack
          w={{ base: "95%", sm: "90%", md: "90%", lg: "80%", xl: "70%" }}
          m="auto"
          gap={"20px"}
          h={{ base: "380px", sm: "350px", md: "155px" }}
          direction={{ base: "column", md: "row" }}
          align={"center"}
        >
          <Box bgColor={"white"} borderRadius="10px">
            <Flex justify="space-between">
              <Box p={4}>
                <Flex align="center" direction={"column"}>
                  <TbTruckDelivery fontSize={50} />
                  <Text
                    fontWeight={"extrabold"}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    FAST DELIVERY
                  </Text>
                </Flex>
                <Text color={"gray.600"} fontSize={{ base: "sm", lg: "md" }}>
                  We will deliver your order within 48 hours
                </Text>
              </Box>
              <Box p={4}>
                <Flex align="center" direction={"column"}>
                  <SettingsIcon fontSize={50} />
                  <Text
                    fontWeight={"extrabold"}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    IMPECCABLE SERVICE
                  </Text>
                </Flex>
                <Text color={"gray.600"} fontSize={{ base: "sm", lg: "md" }}>
                  We will help to assemble the bike after delivery
                </Text>
              </Box>
              <Box p={4}>
                <Flex align="center" direction={"column"}>
                  <BsCreditCard2Back fontSize={50} />
                  <Text
                    fontWeight={"extrabold"}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    SECURE PAYMENT
                  </Text>
                </Flex>
                <Text color={"gray.600"} fontSize={{ base: "sm", lg: "md" }}>
                  We use 3D-secure to protect all payments
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box bgColor={"white"} borderRadius="md" height="100%" width="200px">
            <Text fontSize="xl" py={{ base: "10px", sm: "20px", md: "25px" }}>
              TOTAL: € {totalBill}
            </Text>
            <Button
              colorScheme="red"
              mx={"5px"}
              my={"5px"}
              size={"md"}
              onClick={() => navigate("/payment")}
            >
              MAKE AN ORDER
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CartPage;
