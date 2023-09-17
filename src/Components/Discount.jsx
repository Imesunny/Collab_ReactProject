import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const getData = (setData, setLoading)=>{
    axios.get(`https://specialized-server.onrender.com/products?_page=11&_limit=3`)
    .then((res)=>{setData(res.data.data);setLoading(false)})
    .catch((err)=>console.log(err))
}

const Discount = () => {
  const [isLoading, setLoading ] = useState(false)
  const [data, setData] = useState([])

  const navigate = useNavigate()
    
    useEffect(()=>{
        setLoading(true)
        getData(setData, setLoading)
    } ,[])

    return (
        <Box textAlign={'left'} mx={{base:'30px',sm:'100px',md:'50px'}} my={'40px'} >
            {
                isLoading ? <Heading>Loading...</Heading> :
            
            <>
            <Box my={'20px'}><Heading>BIKES DISCOUNT OF THIS MONTH</Heading></Box>
            <Box my={'20px'}>
                <Flex gap={{base:'10px',md:'20px'}} direction={{base:'column', md:'row'}}>
                        {
                            data?.map((prod)=>{
                                return <ProductCard productData={prod} key={prod._id} w="30%" />
                            })
                        }
                </Flex>
            </Box>
            <Box>
                <Button variant={'outline'} colorScheme='yellow' onClick={()=>navigate("/productPage")}> CATALOGUE </Button>
            </Box>
            </>
}
        </Box>
    );
};

export default Discount;