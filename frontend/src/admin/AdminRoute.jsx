import { useState } from 'react'
import { Modal, HStack, VStack, FormControl, Button, ModalFooter, FormLabel, Input, PinInput, PinInputField, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@chakra-ui/react'
import AdminPage from "./AdminPage.jsx"

const AdminRoute = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const { onOpen, onClose } = useDisclosure()
    const [adminId, setAdminId] = useState("")
    const [passcode, setPasscode] = useState(["", "", "", ""])
    const [submitted, setSubmitted] = useState(false)

    const handlePin = (i, val) => {
        passcode[i] = val
        setPasscode([...passcode])
    }
    const validation = () => {
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
        }, 2000)
        if (adminId === "" || passcode.includes("")) {
            return;
        }
        handleLogin()
    }
    const handleLogin = () => {
        
    }

    if (!loggedIn) return <Modal isOpen={!loggedIn} onOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='text-center' top={'15%'}>
            <ModalHeader className='font-bold text-center bg-slate-700 text-white rounded-t-md'>
                Admin Login
            </ModalHeader>
            <ModalBody className='pt-2'>
                <div className='pt-5'>
                    <VStack className='flex-col gap-4 p-2'>
                        <FormControl isRequired>
                            <HStack className='flex'>
                                <FormLabel className='w-2/6 font-bold' fontWeight={'bold'}>Admin Id</FormLabel>
                                <Input value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder='Provided by backend' />
                            </HStack>
                            {submitted && adminId.length === 0 && <p className='text-red-500'>**Admin Id cannot be empty</p>}
                        </FormControl>
                        <FormControl isRequired>
                            <HStack className='flex'>
                                <FormLabel className='w-1/3' fontWeight={'bold'}>Pass Code</FormLabel>
                                <HStack>
                                    <PinInput type='numeric' mask>
                                        <PinInputField value={passcode[0]} onChange={(e) => handlePin(0, e.target.value)} />
                                        <PinInputField value={passcode[1]} onChange={(e) => handlePin(1, e.target.value)} />
                                        <PinInputField value={passcode[2]} onChange={(e) => handlePin(2, e.target.value)} />
                                        <PinInputField value={passcode[3]} onChange={(e) => handlePin(3, e.target.value)} />
                                    </PinInput>
                                </HStack>
                            </HStack>
                            {submitted && passcode.includes("") && <p className='text-red-500'>**Passcode cannot be empty</p>}
                        </FormControl>
                    </VStack>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button bg={'#334155'} w='full' _hover={{ bg: 'gray.500' }} color='white' onClick={validation}>Login</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    return <AdminPage />
}

export default AdminRoute