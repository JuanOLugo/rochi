import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { createCliente } from '../../../Controllers/Stores.con';



function CreateClientModal({onOpen, isOpen, OnOpenChange, setClient, store, Client}) {
    const [clientname, setclientname] = useState("")
    const [errors, seterrors] = useState("")
    const date = new Date()
    .toLocaleDateString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");


    const handleAddClient = async () => {
        const dataToSend = {
            clientname, date,
            storeid: store._id
        }
        const data = await createCliente(dataToSend)
        setClient([...Client, data.client])
    }


  return (
    <div >
        <Modal isOpen={isOpen} onOpenChange={OnOpenChange} className='absolute top-0 '>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agrega un cliente</ModalHeader>
              <ModalBody>
                <Input type='text' onChange={(e) => setclientname(e.target.value)} label="Nombre del cliente" aria-label='Nombre del cliente'/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="danger" onClick={() => {
                    handleAddClient()
                    onClose()
                }}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreateClientModal