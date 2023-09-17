import { useEffect, useState } from "react";
import { Text,Box, Button, Stack, useRadio, useRadioGroup } from "@chakra-ui/react";

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />

      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        w="60%"
        m="auto"
        fontSize="sm"
        _checked={{
          bg: "yellow.600",
          color: "white",
          borderColor: "rgb(38,38,38)",
        }}
        _focus={{
          // boxShadow: "outline",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export function FilterDiscount({setDiscountFilter}) {
  const options = ["0%-10%","10%-20%", "20%-30%", "30%-40%"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "priceRange",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();
  const [value, setValue] = useState(""); // Track the selected value

  const handleClearAll = () => {
    setValue(""); // Clear the selected value
  };

  useEffect(()=>{
    setDiscountFilter(value);
  },[value])

  return (
    <Stack {...group} align="center" my={'10px'}>
      {options.map((option) => {
        const radio = getRadioProps({ value: option });
        return (
          <RadioCard
            key={option}
            {...radio}
            isChecked={radio.value === value} // Set the checked state based on the selected value
            onChange={() => setValue(option)} // Update the selected value when the radio button is clicked
          >
            {option}
          </RadioCard>
        );
      })}
      <Button
        colorScheme="red"
        color="white"
        size="sm"
        w="60%"
        m="auto"
        onClick={handleClearAll}
      >
        <Text fontSize={"sm"}>CLEAR ALL</Text>
      </Button>
    </Stack>
  );
}
