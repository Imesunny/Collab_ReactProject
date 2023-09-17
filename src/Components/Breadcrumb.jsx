import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  const generateBreadcrumbLinks = () => {
    const breadcrumbTrail = [];

    if (paths.includes("details")) {
      breadcrumbTrail.push(
        <BreadcrumbItem key="home">
          <BreadcrumbLink as={Link} to="/" color="white">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbItem key="products">
          <BreadcrumbLink as={Link} to="/productPage" color="white">
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbItem key="details">
          <BreadcrumbLink color="white">Details</BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else if (paths.includes("productPage")) {
      breadcrumbTrail.push(
        <BreadcrumbItem key="home">
          <BreadcrumbLink as={Link} to="/" color="white">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbItem key="products">
          <BreadcrumbLink color="white">Products</BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else if (paths.includes("cart")) {
      breadcrumbTrail.push(
        <BreadcrumbItem key="home">
          <BreadcrumbLink as={Link} to="/" color="white">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbItem key="cart" isCurrentPage>
          <BreadcrumbLink color="white">Cart</BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else if (paths.includes("payment")) {
      breadcrumbTrail.push(
        <BreadcrumbItem key="home">
          <BreadcrumbLink as={Link} to="/" color="white">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbItem key="cart">
          <BreadcrumbLink as={Link} to="/cart" color="white">
            Cart
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbItem key="payment" isCurrentPage>
          <BreadcrumbLink color="white">Checkout</BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else if (paths.includes("wishlist")) {
      breadcrumbTrail.push(
        <BreadcrumbItem key="home">
          <BreadcrumbLink as={Link} to="/" color="white">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbItem key="wishlist" isCurrentPage>
          <BreadcrumbLink color="white">Wishlist</BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbTrail.push(
        <BreadcrumbItem key="home" isCurrentPage>
          <BreadcrumbLink color="white">Home</BreadcrumbLink>
        </BreadcrumbItem>
      );
    }

    return breadcrumbTrail;
  };

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      mb={"50px"}
      mt="-20px"
      w={paths.includes("details") ? "100%" : "90%"}
      m="auto"
    >
      {generateBreadcrumbLinks()}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
