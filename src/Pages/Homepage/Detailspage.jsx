import React, { useEffect, useRef } from "react";
import {
  Box,
  Image,
  Heading,
  Flex,
  Text,
  Button,
  IconButton,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWish, getSingleProduct, postCartProduct, removeWish } from "../../Redux/action";
import {
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { AddIcon, MinusIcon, WarningTwoIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { BsCart3 } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import { GiReturnArrow } from 'react-icons/gi';
import { TableComp } from "../../Components/TableComp";
// import visa from "../../Images/Visa.png"
// import cash from "../../Images/Cash.png"
// import masterCard from "../../Images/MasterCard.png"
import Breadcrumbs from "../../Components/Breadcrumb";

const Detailspage = () => {
  const [wish, setWish] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);

  const handleColorClick = (index) => {
    setImageIdx(index);
  };

  const dispatch = useDispatch();

  const currproduct = useSelector((store) => {
    return store.productsReducer.currProduct;
  });

  const isLoading = useSelector((store) => {
    return store.productsReducer.isLoading;
  });

  // console.log("currUser", currproduct)

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const wishData = useSelector((store)=>{
    return store.wishReducer.WishProducts;
  })
  useEffect(() => {
    const wishProd = wishData.find((prod) => prod._id === currproduct._id);
    if (wishProd) {
      setWish(true);
    } else {
      setWish(false);
    }
  }, [wishData, currproduct._id]);

  const cartData = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });

  const toast = useToast()
  const toastIdRef = useRef()
  const handleAddToCart = ()=>{
    const existProd = cartData.find((prod)=>prod._id === currproduct._id)
    if(existProd){
      toastIdRef.current = toast({ description: 'Product Already Present in cart' })
    }else{
      dispatch(postCartProduct(currproduct))
      toast({
        title: 'Item added to Cart',
        status: 'success',
        isClosable: true,
      })
    }
  }

  const handleAddToWishlist = () => {
    dispatch(addWish(currproduct));
    toast({
      title: 'Added To WishList',
      status: 'success',
      position: 'top-left',
      isClosable: true,
    })
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeWish(currproduct._id));
    toast({
      title: 'Removed From WishList',
      status: 'warning',
      position: 'top-left',
      isClosable: true,
    })
  };

  const handlequickOrder = ()=>{
    handleAddToCart();
    navigate("/cart")
  }

  const discount = currproduct.discount;

  return (
    <Box w={"90%"} m="auto" my={"50px"} color={"white"}>
      {!isLoading && currproduct.images !== undefined ? (
       <Box>
        <Breadcrumbs/>

        <Flex gap={"40px"} mt='30px'>
          <Box className="firstDiv" w={"50%"}>
            <Box p={"40px"} bg={"#f3f0f3"} borderRadius={"10px"}>
              <Image src={currproduct.images[imageIdx]} />
            </Box>
            <Box bg={"#f3f0f3"} color={'black'} p={'30px'} borderRadius={'10px'} textAlign={'left'} my={'20px'}>
               <Flex direction={'column'} gap={'10px'}>
                    <Text fontSize={"2xl"}  mb={"30px"} letterSpacing={'0.1em'}>CHARACTERISTICS</Text> <Divider h={'1px'} bg={'grey'} />
                    <Flex justify={'space-between'}><Text>Front wheel</Text> <Text>Traverse SL 29</Text></Flex> <Divider h={'1px'} bg={'grey'} />
                    <Flex justify={'space-between'}><Text>Rear Wheel</Text> <Text>TRAVERSE SL 29</Text></Flex> <Divider h={'1px'} bg={'grey'} />
                    <Flex justify={'space-between'}><Text>Front Tire</Text> <Text>BUTCHER GRID TRAIL T9 29×2.3"</Text></Flex> <Divider h={'1px'} bg={'grey'} />
                    <Flex justify={'space-between'}><Text>Inner Tubes</Text> <Text>STANDARD, PRESTA VALUE</Text></Flex> <Divider h={'1px'} bg={'grey'} />
                    <Flex justify={'space-between'}><Text>Front wheel</Text> <Text>BUTCHER GRID TRAIL T7 29 × 2.3"</Text></Flex> <Divider h={'1px'} bg={'grey'} />    
               </Flex>
            </Box>
            <Box
              bg={"#f3f0f3"}
              color={"black"}
              textAlign={"left"}
              pt={"10px"}
              p={"30px"}
              borderRadius={"10px"}
            >
              <Text fontSize={"2xl"}  mb={"30px"} letterSpacing={'0.1em'}>
                DESCRIPTION
              </Text>
              <Text my={"15px"}>
                Power up to trail riding's next level and dominate any and all
                trail monsters the Turbo Kenevo Super Light melds the legendary
                handling and all-around big trail prowess of the Enduro with our
                Super Light electric support to deliver indomitable capability,
                light weight, and power to conquer more and bigger trails.
              </Text>
              <Text my={"15px"}>
                The Turbo Kenevo Super Light puts the "E" in our Enduro,
                delivering more of what you want from your trail ride-more
                capability everywhere, more power to climb, more pop when you
                really need it, more adrenaline. More laps, more jumps, more
                drops, faster rides with fresher legs.
              </Text>
              <Text my={"15px"}>
                And it does all this with less. Carrying much less weight than
                bulkier e-MTBs. the Turbo Kenevo Super Light is hyper-responsive
                and just as willing and able to redefine big trail performance
                as our Enduro. Level up your trail game.
              </Text>
              <Accordion allowMultiple>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Bike Geometry
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <TableComp w='100%' overflow={'hidden'} />
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Manual Downloads
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <a
                          href="https://media.specialized.com/support/collateral/Future_Shock_Retrofit_Compatibility_Tech_Bulletin_Swedish.pdf"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Text as={'p'} color='grey' ml='10px'>
                            {currproduct.name}.pdf
                          </Text>
                        </a>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Box>
          </Box>

          {/* Second Div */}
          <Box className="secondDiv" w={"50%"} textAlign={"left"}>
            <Heading color={"white"}>{currproduct.name}</Heading>

            {/* Starts and Available Items */}
            <Flex my={"20px"} justify={'space-between'}>
                <Flex>
              {currproduct.rating >= 1 ? (
                <AiFillStar size={"20px"} color="#eda515" />
              ) : (
                <AiOutlineStar size={"20px"} color="#eda515" />
              )}
              {currproduct.rating >= 2 ? (
                <AiFillStar size={"20px"} color="#eda515" />
              ) : (
                <AiOutlineStar size={"20px"} color="#eda515" />
              )}
              {currproduct.rating >= 3 ? (
                <AiFillStar size={"20px"} color="#eda515" />
              ) : (
                <AiOutlineStar size={"20px"} color="#eda515" />
              )}
              {currproduct.rating >= 4 ? (
                <AiFillStar size={"20px"} color="#eda515" />
              ) : (
                <AiOutlineStar size={"20px"} color="#eda515" />
              )}
              {currproduct.rating >= 5 ? (
                <AiFillStar size={"20px"} color="#eda515" />
              ) : (
                <AiOutlineStar size={"20px"} color="#eda515" />
              )}
              <Text ml={"10px"} color={"grey"}>
                {currproduct.rating}
              </Text>
              </Flex>
              <Flex direction={'row'} gap='20px' mr={'100px'}  > 
                <Text mt='-3px' color={currproduct.discount < 10 ? "red" : 'green'}>{currproduct.discount < 10 ? "Only few Left" :"In Stocks"}</Text>
                { currproduct.discount < 10 ?
                <Icon color='red' as={WarningTwoIcon}/>  :
                <Icon color={'green'} as={CheckCircleIcon}/>
                }
                <Text mt={'-4px'} color='grey'>{currproduct.discount * 10}</Text>
              </Flex>
            </Flex>

            {/* Color Div */}
            <Flex my={"20px"}>
              <Text mr="10px">Color:</Text>
              {currproduct.color.map((color, index) => {
                return (
                  <Box
                    key={index}
                    width="25px"
                    height="25px"
                    borderRadius="50%"
                    // border={"0.5px solid black"}
                    backgroundColor={color}
                    mr={2}
                    cursor="pointer"
                    onClick={() => handleColorClick(index)}
                  />
                );
              })}
            </Flex>

            {/* Discount and price */}
            {discount && (
              <Flex gap={"5px"}>
                <Text as="del" color={"grey"}>
                  €
                  {Math.floor(currproduct.price + currproduct.price / discount)}
                </Text>
                <Text color={"red"} ml={'5px'}>{discount}%off</Text>{" "}
              </Flex>
            )}
            <Text my={"20px"}>€{currproduct.price}</Text>

            <Divider orientation="horizontal" />

            {/* Cart and Order Buttons */}
            <Flex my={"20px"} gap={"20px"}>
              <Button colorScheme="red"><BsCart3 size={20}/><Text ml={'10px'} onClick={handleAddToCart}>ADD TO CART</Text></Button>
              <Button colorScheme="yellow" onClick={handlequickOrder} >QUICK ORDER</Button>
              <Box>
                <IconButton
                  aria-label="Search database"
                  border=""
                  icon={
                    wish ? (
                      <FaHeart size={"30px"} color="red" />
                    ) : (
                      <FaRegHeart size={"30px"} color="red" />
                    )
                  }
                  // variant="outline"
                  p={""}
                  bg={"rgb(38,38,38)"}
                  _hover={{ bg: "rgb(38,38,38)" }}
                  onClick={() => {
                    if (wish) {
                      handleRemoveFromWishlist();
                    } else {
                      handleAddToWishlist();
                    }
                    setWish((prev) => !prev);
                  }}
                />
              </Box>
            </Flex>

            <Divider orientation="horizontal" />

            {/* Payment Div */}
            <Box bg={"#f3f0f3"} color='black' p='20px' borderRadius={'10px'} my={'20px'}>
                <Flex gap='20px' align={'center'}>
                    <IoWalletOutline size={30} color="green"/>
                    {/* <BsCart3 size={24} color='green'  style={{ filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5))' }}/> */}
                    <Text>PAYMENT</Text>
                </Flex>
                <Flex gap='10px' w='90%' m={'20px auto'} textAlign={'center'} justify={'space-evenly'}>
                    <Flex direction={'column'} w='30%' border={'1px solid grey'} p='10px' borderRadius={'10px'}><Text>Payment by card online</Text>
                    {/* <Image w='90%' m='auto' src={visa}/> */}
                    </Flex>
                    <Flex direction={'column'} w='30%' border={'1px solid grey'} p='10px' borderRadius={'10px'}><Text>Payment by cash</Text>
                    {/* <Image w='60%' m='auto' src={cash}/> */}
                    </Flex>
                    <Flex direction={'column'} w='30%' border={'1px solid grey'} p='10px' borderRadius={'10px'}><Text>Payment by card online</Text>
                    {/* <Image w='90%' m='auto' src={masterCard}/> */}
                    </Flex>
                </Flex>
            </Box>

            {/* Warranty Div */}
             <Box bg={"#f3f0f3"} color='black' p='20px' borderRadius={'10px'} my={'20px'}>
                <Flex gap='10px' >
                    <CheckCircleIcon color='green' mt='5px'/>
                    <Text>WARRANTY: </Text>
                    <Text>2 years for registered products and 1 year  for not registered products</Text>
                </Flex>
             </Box>

             {/* Exchange Div */}
             <Box bg={"#f3f0f3"} color='black' p='20px' borderRadius={'10px'} my={'20px'}>
                <Flex gap='10px' >
                    <GiReturnArrow color='green' size={24}/>
                    <Text>EXCHANGE & RETURN: </Text>
                    <Text>within 14 days</Text>
                </Flex>
             </Box>

          </Box>
        </Flex> </Box>
      ) : (
        <Heading fontSize={"9xl"}>Loading...</Heading>
      )}
    </Box>
  );
};

export default Detailspage;
