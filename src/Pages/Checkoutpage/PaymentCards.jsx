import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    useRadio,
    useRadioGroup,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { postnewCard } from "../../Redux/action";
  import { useDispatch, useSelector } from "react-redux";
  import { Ordersuccessfull } from "./Ordersuccessfull";
  import { Otppage } from "./Otppage"
  
  function CustomRadio(props) {
    const { ele, ...radioProps } = props;
  
    const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
      useRadio(radioProps);
  
    return (
      <label {...htmlProps} cursor="pointer">
        <input {...getInputProps({})} hidden />
  
        <Box
                // bg="white"
                bg={state.isChecked ? "yellow.400" : "white"}
                color="grey"
                borderRadius={"10px"}
                // w="90%"
                _hover={{cursor:'pointer'}}
                m="auto"
                p="10px"
              >
                <Text color="black">Name: {ele.cardName}</Text>
                <Text>Card no: {ele.cardNumber}</Text>
                <Flex gap="5%">
                  <Text>Expires on: {ele.cardDate}</Text>
                  {/* <Text>{ele.CVV}</Text> */}
                </Flex>
              </Box>
      </label>
    );
  }
  
  const PaymentCards = () => {
  
    const [formData, setFormData] = useState({});
    const [modalNumber, setModalNumber] = useState(0)
    const dispatch = useDispatch();
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      e.target.reset();
      if(formData.cardName !== undefined ){
        dispatch(postnewCard(formData));
      }
      setFormData({})
    };
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const CardsArray = useSelector((store) => {
      return store.paymentReducer.CardsData;
    });
    // console.log(formData)
  
    const { value, getRadioProps, getRootProps } = useRadioGroup({
      defaultValue: "Kevin",
      // onChange: handleChange,
    });
  
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const handleOTP = ()=>{
      onOpen();
    }
    
    return (
      <Box w="90%" m="auto" color={"white"} textAlign={"left"}>
        <form onSubmit={handleFormSubmit}>
          <Text fontSize="xl" fontWeight="bold" mt={10} mb={4} color="white">
            PAYMENT INFO
          </Text>
          <Stack spacing={4}>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter cardholder name"
                focusBorderColor="yellow.500"
                name="cardName"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                // type="number"
                // placeholder="Enter card number"
                focusBorderColor="yellow.500"
                name="cardNumber"
                type="tel" 
                inputmode="numeric" 
                pattern="[0-9\s]{13,19}" 
                autocomplete="cc-number" maxlength="19" 
                placeholder="xxxx xxxx xxxx xxxx"
                onChange={handleChange}
              />
            </FormControl>
            <Flex gap='20px' justify={'space-between'}>
              <FormControl>
                <Input
                  type="date"
                  placeholder="MM/YY"
                  focusBorderColor="yellow.500"
                  name="cardDate"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Input
                  // type="number"
                  min={100}
                  max={999}
                  type="password"
                  placeholder="Enter CVV"
                  // width="90%"
                  focusBorderColor="yellow.500"
                  name="CVV"
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>
          </Stack>
          <Button colorScheme="red" mt={6} color="white" p={6} type="submit">
            ADD NEW CARD
          </Button>
        </form>
  
        {/* Saved Cards */}
        {
          CardsArray.length === 0 ? 
          <Text
            fontSize="xl"
            fontWeight="bold"
            mb={4}
            paddingTop={10}
            color="white"
          >
            NO SAVED CARDS
          </Text> :
       
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            mb={4}
            paddingTop={10}
            color="white"
          >
            SAVED CARDS
          </Text>
          <Flex direction={"column"} gap="10px">
          {CardsArray.map((ele) => {
            return (
              <CustomRadio
                key={ele.name}
                ele={ele}
                {...getRadioProps({ value: ele.cardName })}
              />
            );
          })}
          <Button colorScheme="red" mt={6} color="white" p={6} alignSelf={'center'} onClick={handleOTP}>MAKE PAYMENT</Button>
          </Flex>
        </Box>
         }
        <Modal isOpen={isOpen} onClose={onClose}size={'2xl'}>
          <ModalOverlay />
          <ModalContent bg='#262626' textAlign={'center'} p='20px'>
          <ModalCloseButton color={'white'}/>
            {
            modalNumber === 0 ?
              <Otppage setModalNumber={setModalNumber }/>
            :
              <Ordersuccessfull setModalNumber={setModalNumber }/>
          }
          </ModalContent>
        </Modal>
        
      </Box>
    );
  };
  
  export default PaymentCards;
  