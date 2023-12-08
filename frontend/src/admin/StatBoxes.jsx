import React from 'react'
import { Box, Text, HStack } from '@chakra-ui/react'

const StatBoxes = () => {
    const stats = [
        { title: "Total Sale Amount", data: "₹1,384,064", color:'blue.800' },
        { title: "Total Orders", data: "36", color:'yellow.900' },
        { title: "Total Users", data: "11", color:'blue.800' },
        { title: "Conversion Rate", data: "96%", color:'yellow.900' },
    ]
    return (
        <HStack className='w-full py-4 px-7'>
            {stats.map(ele => <Box className='w-full rounded-xl mx-2 text-white py-6 text-lg font-bold text-center p-5' key={ele.title} bg={ele.color}>
                <Text>{ele.title}</Text>
                <Text>{ele.data}</Text>
            </Box>)}
        </HStack>
    )
}

export default StatBoxes