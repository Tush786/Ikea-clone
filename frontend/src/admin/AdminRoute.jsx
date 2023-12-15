import { useState } from 'react'
import {Modal, ModalBody, useDisclosure} from '@chakra-ui/react'

const AdminRoute = ({ children }) => {
    const [logged,setLogged] = useState(false)
    const {isOpen,onOpen,onClose} = useDisclosure()
    if(!logged) return <Modal isOpen={logged} onOpen={onOpen} onClose={onClose}>
        <ModalBody></ModalBody>
    </Modal>
    return (
        <>
            
        </>
    )
}

export default AdminRoute