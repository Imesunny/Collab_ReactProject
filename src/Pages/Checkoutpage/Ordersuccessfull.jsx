import { Heading, ButtonGroup, Button } from "@chakra-ui/react"
import { CheckCircleIcon } from '@chakra-ui/icons'
import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Ordersuccessfull = ({setModalNumber }) => {

    const [orderID, setorderID] = useState("")

    useEffect(() => {
        let orderNumber = Math.floor(Math.random() * 1000000)
        setorderID(orderNumber)
    }, [])

    const navigate = useNavigate()

    return (
        <div style={{ color: "white" }}>
            <Heading size='xl' mt='10px'>Congratulations <CheckCircleIcon w={8} h={8} color="green.500" /></Heading>
            <Heading size='md' my='5px'>Your order has been placed successfully</Heading>
            <Heading size='lg'> Order ID - {orderID} </Heading>
            <h6 style={{ fontSize: "small" }}>Please keep this Order ID for future reference </h6>
            <ButtonGroup variant="outline" width="40%" margin="20px" >
                <Button onClick={() => {navigate('/');setModalNumber(0)}} colorScheme="yellow" className="btn">
                    Continue Shopping...
                </Button>
            </ButtonGroup>
        </div >
    )
}