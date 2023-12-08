import React from 'react'
import { VStack, Box, Icon } from '@chakra-ui/react'
import { MdBarChart, MdLogout, MdOutlineShoppingBag, MdShoppingCart } from 'react-icons/md'
import { FaRegUser, FaSquarePlus } from 'react-icons/fa6'
const NavLinksComp = ({tab,setTab,onClose}) => {
    const nav_links = [
        { title: "Dashboard", url: 'dashboard', icon: MdBarChart },
        { title: "Orders", url: "orders", icon: MdOutlineShoppingBag },
        { title: "Products", url: "products", icon: MdShoppingCart },
        { title: "Add Product", url: "addProduct", icon: FaSquarePlus },
        { url: "users", title: "Users", icon: FaRegUser },
        { url: "logout", title: "Logout", icon: MdLogout }
    ]
    return (
        <VStack className='w-full mt-[10%]'>
            {nav_links.map(ele => {
                return <Box key={ele.url} className='flex items-center px-8 gap-5 text-lg py-4 w-full font-bold text-white text-left cursor-pointer hover:bg-[#374151]' style={tab === ele.url ? { background: '#374151', color: 'white' } : {}} onClick={() => { setTab(ele.url); if(onClose)  onClose() }}>
                    <Icon as={ele.icon} boxSize={6} />
                    {ele.title}
                </Box>
            })}
        </VStack>
    )
}

export default NavLinksComp
