import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Select,
    Stack,
    Text,
    useRadio,
    useRadioGroup,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { postNewAddress } from "../../Redux/action";
  
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
                <Text color="black">{ele.name}</Text>
                <Text>{ele.email}</Text>
                <Text>phone no: {ele.number}</Text>
                <Flex gap="5%">
                  {" "}
                  <Text>address: {ele.address}</Text>
                  <Text>{ele.pincode}</Text>
                </Flex>
              </Box>
      </label>
    );
  }
  
  const PersonalInfo = ({setSelectedBox}) => {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      e.target.reset();
      if(formData.name !== undefined ){
        dispatch(postNewAddress(formData));
      }
      setFormData({})
      // alert("done")
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const AddressArray = useSelector((store) => {
      return store.paymentReducer.AddressData;
    });
  
    // console.log(AddressArray);
  
    const { value, getRadioProps, getRootProps } = useRadioGroup({
      defaultValue: "Kevin",
  
      // onChange: handleChange,
    });
  
    return (
      <Box
        p={4}
        // border="1px solid green"
        w="90%"
        m="auto"
        color={"white"}
        textAlign={"left"}
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={4}
          paddingTop={10}
          color="white"
        >
          MAIN PERSONAL INFO
        </Text>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            <Flex>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  width="100%"
                  focusBorderColor="yellow.500"
                  name="name"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  width="100%"
                  marginLeft={15}
                  focusBorderColor="yellow.500"
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>
            <Flex>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  name="number"
                  focusBorderColor="yellow.500"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Select
                  placeholder="Select your gender"
                  marginLeft={15}
                  focusBorderColor="yellow.500"
                  name="gender"
                  onChange={handleChange}
                >
                  <option style={{ color: "black" }} value="male">
                    Male
                  </option>
                  <option style={{ color: "black" }} value="female">
                    Female
                  </option>
                  <option style={{ color: "black" }} value="other">
                    Other
                  </option>
                </Select>
              </FormControl>
            </Flex>
          </Stack>
          <Text fontSize="xl" fontWeight="bold" mt={10} mb={4} color="white">
            MY DELIVERY ADDRESS
          </Text>
          <Stack spacing={4} w="102%">
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your address"
                focusBorderColor="yellow.500"
                name="address"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter your pincode"
                focusBorderColor="yellow.500"
                name="pincode"
                min={100000}
                max={999999}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>
  
          <Button colorScheme="red" mt={6} color="white" p={6} type="submit">
            ADD NEW ADDRESS
          </Button>
        </form>
  
        {/* Saved Address */}
        {
          AddressArray.length === 0 ? 
          <Text
            fontSize="xl"
            fontWeight="bold"
            mb={4}
            paddingTop={10}
            color="white"
          >
            NO SAVED ADDRESS
          </Text> :
  
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            mb={4}
            paddingTop={10}
            color="white"
          >
            SAVED ADDRESS
          </Text>
          <Flex direction={"column"} gap="10px">
          {AddressArray.map((ele) => {
            return (
              <CustomRadio
                key={ele.name}
                ele={ele}
                {...getRadioProps({ value: ele.name })}
              />
            );
          })}
          <Button colorScheme="red" mt={6} color="white" p={6} alignSelf={'center'} onClick={()=>setSelectedBox(1)}>MAKE PAYMENT</Button>
          </Flex>
        </Box>
  }
      </Box>
    );
  };
  
  export default PersonalInfo;
  