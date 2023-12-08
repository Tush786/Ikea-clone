import React, { useEffect, useState } from 'react'
import { VStack, Icon, Drawer, useDisclosure, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody } from '@chakra-ui/react'
import { GiHamburgerMenu } from "react-icons/gi";
import AdminCard from './AdminCard';
import NavLinksComp from './NavLinkComp';

const LeftPanel = ({ tab, setTab }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 900);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isSmallScreen) {
        return <>
            <Icon as={GiHamburgerMenu} onClick={onOpen} color='white' boxSize={7} m='3' />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent bg='#1f2937'>
                    <DrawerCloseButton color={'white'} />
                    <DrawerHeader>
                        <AdminCard />
                    </DrawerHeader>

                    <DrawerBody>
                        <NavLinksComp tab={tab} setTab={setTab} onClose={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    }
    else {
        return (
            <VStack className='py-5'>
                <AdminCard />
                <NavLinksComp tab={tab} setTab={setTab} />
            </VStack>
        )
    }
}

export default LeftPanel
