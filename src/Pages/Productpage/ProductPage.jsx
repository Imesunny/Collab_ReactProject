import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/action";
import {
  Box,
  Heading,
  Button,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  Select,
  Grid,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";
import ProductCard from "../../Components/ProductCard";
// import { MinusIcon } from "@chakra-ui/icons";
import Breadcrumbs from "../../Components/Breadcrumb";
import { FilterPriceRange } from "./FilterPrice";
import FilterCategory from "./FilterCategory";
import FilterColor from "./FilterColor";
import { FilterDiscount } from "./FilterDiscount";

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("");
  const toast = useToast();

  const data = useSelector((state) => state.productsReducer.AllProducts);
  const isLoading = useSelector((state) => state.productsReducer.isLoading);
  const dispatch = useDispatch();

  const totalPages = useSelector((store) => {
    return store.productsReducer.totalPages;
  });

  if (page > totalPages) {
    if (totalPages !== 0) {
      setPage(1);
    }
  }

  const handlePrevPage = () => {
    if (page === 1) {
      toast({ description: "You are on the First page" });
      return;
    }
    setPage((page) => page - 1);
  };
  const handleNextPage = () => {
    if (page === totalPages) {
      toast({ description: "You are on the Last page" });
      return;
    }
    setPage((page) => page + 1);
  };

  const handleSort = (e) => {
    if (e.target.value === "") {
      dispatch(getProducts(1));
      return;
    }
    setPage(1);
    setSorting(e.target.value);
  };

  // Category Filters
  let [categoryFilter, setCategoryFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState("");
  const [discountFilter, setDiscountFilter] = useState("");
  const [colorFilter, setColorFilter] = useState([]);

  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
  ]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    let categoryQuery = "";
    let priceQuery = "";
    let discountQuery = "";
    let colorQuery = "";

    if (categoryFilter.length > 0) {
      categoryQuery = categoryFilter
        .filter((category) => category !== "")
        .map((category) => `category=${category}`)
        .join("&");
    }

    if (priceRangeFilter !== "") {
      const [minPrice, maxPrice] = priceRangeFilter.split("-");
      priceQuery = `price_gte=${minPrice}&price_lte=${maxPrice}`;
    }

    const regex = /(\d+)%-(\d+)%/;
    const match = discountFilter.match(regex);
    if (match) {
      const firstNumber = parseInt(match[1]);
      const secondNumber = parseInt(match[2]);
      discountQuery = `id_gte=${firstNumber}&id_lte=${secondNumber}`;
    }

    colorQuery = colorFilter.map((color) => `color_like=${color}`).join("&");

    dispatch(
      getProducts(
        page,
        sorting,
        categoryQuery,
        priceQuery,
        colorQuery,
        discountQuery,
        totalPages
      )
    );
  }, [
    page,
    sorting,
    categoryFilter,
    priceRangeFilter,
    colorFilter,
    discountFilter,
  ]);

  const isError = useSelector((store) => {
    return store.productsReducer.isError;
  });

  if (isError) {
    return (
      <Box color={"white"} my={"100px"}>
        {" "}
        <Heading color={"red"}>UNEXPECTED ERROR OCCURED</Heading>{" "}
        <Text>Please Refresh the page</Text>
      </Box>
    );
  }
  return (
    <Box my={"50px"}>
      <Box>
        <Breadcrumbs />
        <Flex justify={"end"} mt={"10px"}>
          <Box
            w={{ base: "60%", md: "30%" }}
            color="white"
            bg={"rgb(38,38,38)"}
          >
            <Select
              w="90%"
              m="auto"
              bg={"rgb(38,38,38)"}
              _hover={{ borderColor: "rgb(38,38,38)" }}
              // _focus={{ borderColor: "rgb(38,38,38)" }}
              onChange={handleSort}
            >
              <option
                style={{
                  backgroundColor: "rgb(38,38,38)",
                  color: "white",
                }}
                value=""
              >
                SORT BY PRICE
              </option>
              <option
                style={{
                  backgroundColor: "rgb(38,38,38)",
                  color: "white",
                }}
                value="asc"
              >
                LOW TO HIGH
              </option>
              <option
                style={{
                  backgroundColor: "rgb(38,38,38)",
                  color: "white",
                }}
                value="desc"
              >
                HIGH TO LOW
              </option>
            </Select>
          </Box>
        </Flex>
        <Box display={"flex"} flexDirection={{ base: "column", lg: "row" }}>
          <Box
            w={{ base: "100%", lg: "22%" }}
            m="auto"
            color={"white"}
            fontSize={"34px"}
            marginTop={{ base: null, md: "1.5em" }}
            // paddingTop={{ base: "", md: "", lg: "" }}
            fontWeight={"600"}
            // border={"1px solid red"}
          >
            {/* filtering */}
            <Grid
              gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(1, 1fr)",
              }}
              gap="20px"
            >
              {/* filter by Category */}
              <Box>
                <Heading size="md" color={"grey"}>
                  FILTER BY CATEGORY
                </Heading>
                <FilterCategory
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  allChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  setCategoryFilter={setCategoryFilter}
                />
              </Box>
              {/* filter by Price range */}
              <Box>
                <Heading size="md" color={"grey"}>
                  FILTER BY PRICE RANGE
                </Heading>
                <FilterPriceRange setPriceRangeFilter={setPriceRangeFilter} />
              </Box>
              <Box>
                <Heading size="md" color={"grey"}>
                  FILTER BY DISCOUNT
                </Heading>
                <FilterDiscount setDiscountFilter={setDiscountFilter} />
              </Box>
              <Box>
                <Heading size="md" color={"grey"}>
                  FILTER BY COLOR
                </Heading>
                <FilterColor setColorFilter={setColorFilter} />
              </Box>
            </Grid>
          </Box>
          {totalPages === 0 ? (
            <Box
              color={"yellow"}
              my={"20px"}
              w={{ base: "90%", lg: "75%" }}
              m="auto"

            >
              <Heading color={"red"}>NO PRODUCTS AVAILABLE</Heading>
              <Image
                src="https://www.aceshoppersworld.com/images/empty_cart.png"
                w="40%"
                m="auto"
                alt="Please refresh the page"
                my='10px'
              />
            </Box>
          ) : isLoading ? (
            /* Skeleton */
            <Box
              w={{ base: "90%", lg: "75%" }}
              m="auto"
              display={"grid"}
              gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={{ base: "10px", md: "20px" }}
              paddingTop={{ base: "1em", md: "2em", lg: "3em" }}
              // border={"1px solid red"}
            >
              {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((ele, i) => {
                return (
                  <Box
                    h="400px"
                    border={"1px solid grey"}
                    borderRadius={"20px"}
                    p="10px"
                    key={i}
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
                    <SkeletonText
                      mt="4"
                      noOfLines={6}
                      spacing="4"
                      skeletonHeight="2"
                    />
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box
              w={{ base: "90%", lg: "75%" }}
              m="auto"
              display={"grid"}
              gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={{ base: "10px", md: "20px" }}
              paddingTop={{ base: "1em", md: "2em", lg: "3em" }}
              // border={"1px solid red"}
            >
              {data?.map((prod) => {
                return (
                  <ProductCard
                    productData={prod}
                    key={prod._id}
                    discount={prod.discount}
                  />
                );
              })}
            </Box>
          )}
        </Box>

        {/* Pagination */}
        <Box w="200px" m="auto" my={"50px"}>
          <Flex justify={"space-between"}>
            <Button
              variant={"outline"}
              colorScheme="yellow"
              disabled={page <= 1 ? true : false}
              onClick={handlePrevPage}
            >
              Prev
            </Button>
            <Button colorScheme="grey">{page}</Button>
            <Button
              variant={"outline"}
              colorScheme="yellow"
              disabled={page >= totalPages ? true : false}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
