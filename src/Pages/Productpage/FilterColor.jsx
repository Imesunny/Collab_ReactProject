import { useEffect, useState } from "react";
import { Text,Box, Button, Grid, useRadio, useRadioGroup } from "@chakra-ui/react";

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
        // borderWidth="2px"
        borderRadius="full"
        boxShadow="md"
        w="1.5rem"
        h="1.5rem"
        m="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="xs"
        color="white"
        borderColor= {props.isChecked ? "black" : "rgb(38, 38, 38)"}
        bg={props.value.toLowerCase()} // Use the lowercase color value as the background color
        _checked={{
          borderWidth: "2px",
          borderColor:  "white",
          w:"2.3rem",
          h:"2.3rem"
        }}
        _focus={{
          // boxShadow: "outline",
        }}
      >
        {/* {props.children} */}
      </Box>
    </Box>
  );
}

export function FilterColor({setColorFilter}) {
  const options = ["red", "yellow", "orange", "green", "grey", "blue", "pink", "white", "black"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "ColorRange",
    defaultValue: [], // Set the initial selected value as an empty array
    onChange: (values) => console.log(values), // Log the selected values
  });

  const group = getRootProps();
  const [value, setValue] = useState([]); // Track the selected values as an array

  const handleClearAll = () => {
    setValue([]); // Clear the selected values
  };

  useEffect(()=>{
    setColorFilter(value);
  }, [value])

  return (
    <Grid gap="8px" gridTemplateColumns="repeat(5, 1fr)" my={'10px'} mx='5px' {...group}>
      {options.map((option) => {
        const radio = getRadioProps({ value: option });
        return (
          <RadioCard
            key={option}
            {...radio}
            isChecked={value.includes(option)} // Set the checked state based on whether the value is in the selected values array
            onChange={() => {
              if (value.includes(option)) {
                setValue(value.filter((v) => v !== option)); // Remove the value if it is already selected
              } else {
                setValue([...value, option]); // Add the value to the selected values
              }
            }}
            value={option} // Pass the color value to the RadioCard component
          >
            {option}
          </RadioCard>
        );
      })}
      <Button
        colorScheme="red"
        color="white"
        size={{base:"xs",md:"sm"}}
        w="100%"
        m="auto"
        onClick={handleClearAll}
      >
        <Text fontSize={"sm"}>CLEAR</Text>
      </Button>
    </Grid>
  );
}

export default FilterColor;
