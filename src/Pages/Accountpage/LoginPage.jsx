import React, { useState } from "react";
import "./accountpage.css";
import {
  FormLabel,
  Input,
  Heading,
  Checkbox,
  Button,
  ButtonGroup,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Box,
  Link,
  Text,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { Signup } from "./SignupPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../Redux/action";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const AllUsers = useSelector((store) => store.accountReducer.AllUsers)
  const isLogin = useSelector((store) => store.accountReducer.isLogin);

  // const currUser = useSelector((store) => store.accountReducer.currUser);
  // console.log(AllUsers)

  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLogin) {
    navigate("/");
  }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async(e) => {
    e.preventDefault();

    // const user = AllUsers.find(
    //     (user) => user.email === email && user.password === password
    //   );
    const currUser = { email, password };

    // console.log(currUser);
    const user = await dispatch(LoginUser(currUser));

    if (user === true) {
      toast({
        title: "SIGNIN SUCCESSFULL",
        status: "success",
        position: "top-left",
        isClosable: true,
      });

    } else if (user === "failed") {
      toast({
        title: "Login Failed",
        status: "error",
        position: "top-right",
      });
    } else {
      toast({
        title: "WRONG CREDENTIALS",
        status: "error",
        position: "top-left",
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box
        className="main_form_div"
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        m="10px auto"
        p={{ base: "25px" }}
        //  border={'1px solid red'}
        bg={null}
      >
        <Heading fontWeight="600" fontSize="32px" color={"white"}>
          Sign in to your Account
        </Heading>
        <br />
        <form onSubmit={handleSubmit} style={{ color: "white" }}>
          <FormControl>
            <FormLabel mb={"5px"}> Email </FormLabel>
            <Input
              mb={"10px"}
              type="email"
              placeholder="Email"
              focusBorderColor="yellow.600"
              required
              onChange={(e) => setemail(e.target.value)}
            />
            <br />

            <FormLabel mb={"5px"}> Password </FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                focusBorderColor="yellow.600"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="yellow"
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <br />
            <br />
            <Box
              className="item_display_corner"
              mb={"10px"}
              fontSize={{ base: "sm", sm: "md" }}
            >
              <div>
                <Checkbox
                  colorScheme="yellow"
                  fontSize={{ base: "sm", sm: "md" }}
                >
                  Remember Me
                </Checkbox>
              </div>
              <div>
                <Link>Forgot your password?</Link>{" "}
              </div>
            </Box>

            <Box className="item_center" my={"10px"}>
              <Text className="small_font" color={"grey"}>
                I accept the Specialized{" "}
                <Link className="hover_text_color">Terms of Use</Link> and
                acknowledge Specialized will use my information in accordance
                with its{" "}
                <a
                  href="https://www.specialized.com/sg/en/privacy-policy"
                  className="hover_text_color"
                >
                  Privacy Policy.
                </a>
              </Text>
            </Box>
            <br />
            <ButtonGroup variant="outline" width="100%">
              <Button type="submit" className="btn" colorScheme="yellow">
                {" "}
                Sign In{" "}
              </Button>
            </ButtonGroup>

            <br />
            <br />
            <ButtonGroup variant="outline" width="100%">
              <Button onClick={onOpen} className="btn" colorScheme="yellow">
                Create Account
              </Button>
            </ButtonGroup>
          </FormControl>
        </form>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
          size={{ base: "xs", sm: "sm", md: "lg" }}
        >
          <ModalOverlay />
          <ModalContent bg="rgb(38,38,38)" borderRadius={"20px"}>
            <ModalCloseButton color={"white"} />
            <Signup onClose={onClose} />
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};
