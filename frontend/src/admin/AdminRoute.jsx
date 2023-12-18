import { useState } from 'react'
import { Modal, HStack, VStack, FormControl, Button, ModalFooter, FormLabel, Input, PinInput, PinInputField, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@chakra-ui/react'
import AdminPage from "./AdminPage.jsx"

const AdminRoute = () => {
    const [logged, setLogged] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [adminId,setAdminId] = useState("")
    const [passcode,setPasscode] = useState("")
    if (!logged) return <Modal isOpen={!logged} onOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='text-center'>
            <ModalHeader className='font-bold text-center bg-slate-700 text-white rounded-t-md'>
                Admin Login
            </ModalHeader>
            <ModalBody className='pt-2'>
                <form className='pt-5'>
                    <VStack className='flex-col gap-4 p-2'>
                        <FormControl isRequired>
                            <HStack className='flex'>
                                <FormLabel className='w-2/6'>Admin Id</FormLabel>
                                <Input placeholder='Basic usage' />
                            </HStack>
                        </FormControl>
                        <FormControl isRequired>
                            <HStack className='flex'>
                                <FormLabel className='w-1/3'>PassCode</FormLabel>
                                <HStack>
                                    <PinInput type='alphanumeric' mask>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                            </HStack>
                        </FormControl>
                    </VStack>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button bg={'#334155'} w='full' color='white'>Login</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    return <AdminPage />
}

export default AdminRoute