import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../../Redux/action";
import {
  Box,
  Button,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import ProductCard from "../../Components/ProductCard";
import { Link } from "react-router-dom";

export default function MyWishlist() {
  const data = useSelector((state) => state.wishReducer.WishProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishList);
  }, [dispatch]);

  if (data.length === 0) {
    return (
      <Box my={"50px"} color="white">
        <Box
          h="400px"
          border={"1px solid grey"}
          w={{ base: "90%", sm: "80%", md: "50%", lg: "50%" }}
          m="auto"
          borderRadius={"20px"}
          p="10px"
        >
          <Skeleton borderRadius={"20px"}>
            <div>this</div>
            <div>is</div>
            <div>a</div>
            <div>skeleton</div>
            <div>skeleton</div>
            <div>skeleton</div>
            <div>skeleton</div>
          </Skeleton>
          <SkeletonCircle size="10" mt="4" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
        </Box>
        <Box position={'absolute'} top='220px' mx="20%">
        <Heading color={'yellow'}> Your Wishlist is Empty </Heading>
        <Text my={'15px'}>Add some products to you wishlist</Text>
        <Link to='/productPage'>
          <Button colorScheme="red">GO TO ALL PRODUCTS</Button>
        </Link></Box>
      </Box>
    );
  }

  return (
    <Box my={"40px"}>
      {data.length === 0 ? (
        <Heading color={"white"} fontSize={"9xl"}>
          Loading
        </Heading>
      ) : (
        <Box>
          <Heading color={"white"} letterSpacing={"0.2em"}>
            WISHLIST
          </Heading>
          <Box display={"flex"}>
            <Box
              w={{ base: "90%", sm: "85%", md: "90%" }}
              m="auto"
              display={"grid"}
              gridTemplateColumns={{
                base: "repeat(1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap="20px"
              paddingTop={"2em"}
            >
              {data?.map((prod) => {
                return <ProductCard productData={prod} key={prod._id} />;
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
