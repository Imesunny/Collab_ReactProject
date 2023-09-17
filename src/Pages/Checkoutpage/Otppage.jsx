import { FormLabel, Input, ButtonGroup, Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

export const Otppage = ({ setModalNumber }) => {
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  const formRef = useRef();
  const toast = useToast()

  const handleotp = (e) => {
    e.preventDefault();
    const firstnum = formRef.current.firstnum.value;
    const secnum = formRef.current.secnum.value;
    const thirdnum = formRef.current.thirdnum.value;
    const forthnum = formRef.current.forthnum.value;

    if (
      firstnum === "1" &&
      secnum === "2" &&
      thirdnum === "3" &&
      forthnum === "4"
    ) {
      toast({
                title: 'PAYMENT SUCCESSFULL',
                status: 'success',
                position: 'top-left',
                isClosable: true,
              })
      setModalNumber(1);
    } else {
      toast({
        title: 'WRONG OTP',
        status: 'error',
        position: 'top-left',
        isClosable: true,
      })
      e.target.reset();
    }
  };

  const handleInput = (inputRef, e) => {
    const value = e.target.value;
    if (value.length >= 1) {
      inputRef.current.value = value.substring(0, 1);
      focusNextInput(inputRef);
    }
  };

  const handleKeyDown = (inputRef, e) => {
    if (e.key === "Backspace" && inputRef.current.value === "") {
      focusPreviousInput(inputRef);
    }
  };

  const focusNextInput = (currentInputRef) => {
    if (currentInputRef === firstInputRef) {
      secondInputRef.current.focus();
    } else if (currentInputRef === secondInputRef) {
      thirdInputRef.current.focus();
    } else if (currentInputRef === thirdInputRef) {
      fourthInputRef.current.focus();
    }
  };

  const focusPreviousInput = (currentInputRef) => {
    if (currentInputRef === fourthInputRef) {
      thirdInputRef.current.focus();
    } else if (currentInputRef === thirdInputRef) {
      secondInputRef.current.focus();
    } else if (currentInputRef === secondInputRef) {
      firstInputRef.current.focus();
    }
  };

  const [randomNumber, setRandomNumber] = useState(0);
  useEffect(() => {
    // Generate a random number between 1 and 100
    const newRandomNumber = Math.floor(100000 + Math.random() * 900000);
    setRandomNumber(newRandomNumber);
  }, []);
  // console.log(randomNumber);

  return (
    <div style={{ color: "white" }}>
      <form ref={formRef} onSubmit={handleotp}>
        <FormLabel> Enter OTP </FormLabel>
        <Input
          type="number"
          ref={firstInputRef}
          name="firstnum"
          maxWidth={"7%"}
          maxLength={"1"}
          focusBorderColor="yellow.600"
          onChange={(e) => handleInput(firstInputRef, e)}
          onKeyDown={(e) => handleKeyDown(firstInputRef, e)}
        />
        <Input
          type="number"
          ref={secondInputRef}
          name="secnum"
          maxWidth={"7%"}
          maxLength={"1"}
          focusBorderColor="yellow.600"
          onChange={(e) => handleInput(secondInputRef, e)}
          onKeyDown={(e) => handleKeyDown(secondInputRef, e)}
        />
        <Input
          type="number"
          ref={thirdInputRef}
          name="thirdnum"
          maxWidth={"7%"}
          maxLength={"1"}
          focusBorderColor="yellow.600"
          onChange={(e) => handleInput(thirdInputRef, e)}
          onKeyDown={(e) => handleKeyDown(thirdInputRef, e)}
        />
        <Input
          type="number"
          ref={fourthInputRef}
          name="forthnum"
          maxWidth={"7%"}
          maxLength={"1"}
          focusBorderColor="yellow.600"
          onChange={(e) => handleInput(fourthInputRef, e)}
          onKeyDown={(e) => handleKeyDown(fourthInputRef, e)}
        /><Input display={'none'} type="number" name='otp' focusBorderColor='yellow.600' value={randomNumber}/>
        <br />
        <br />
        <ButtonGroup variant="outline" width="50%">
          <Button type="submit" colorScheme="yellow" className="btn">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};
