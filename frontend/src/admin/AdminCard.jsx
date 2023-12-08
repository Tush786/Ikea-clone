import React from 'react'
import {Flex,Avatar,Box,Heading,Text} from '@chakra-ui/react'
const AdminCard = () => {
    const user = {
        name: "John Doe",
        email: "jd@gmail.com",
        dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-RmbbqvwGsaz4PytA63zRgBGdBIn7FroPg&usqp=CAU"
    }
    return (
        <Flex flex='1' gap='4' className='text-white bg-[#374151] py-2 px-5 w-[85%] rounded-md' alignItems='center' flexWrap='wrap'>
            <Avatar name={user?.name} src={user?.dp} />
            <Box>
                <Heading size='sm'>{user?.name}</Heading>
                <Text>{user?.email}</Text>
            </Box>
        </Flex>
    )
}

export default AdminCard
