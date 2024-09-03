import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, Input, SelectItem} from "@nextui-org/react";
import { addAbono } from "../../../Controllers/Stores.con";

function Abonomodal({ isOpen, OnOpenChange, setcreditos, onClose, clients, setabono, creditos, store, abonos }) {

    const [clientid, setclientid] = useState(null)
    const [abonoamount, setabonoamount] = useState(null)
    const date = new Date()
    .toLocaleDateString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

    
    const handleaddabono = async () => {

        const filterCredit = creditos.filter(e => {
          return e.clientOwner._id == clientid
        })

        const dataToSend = {
          clientid, 
          abonoamount,
          storeid: store._id,
          date,
          credito: filterCredit[0]._id
        }
        
        const data = await addAbono(dataToSend)
        if(data.iddel){

          const delCredit = creditos.filter(e => {
            return e._id != data.iddel
          })
          setcreditos(delCredit)
          setabono([...abonos, data.abono])
        }else{
        setabono([...abonos, data.abono])
        }

    }

    useEffect(() => {
       if(clientid){
        const data = creditos.filter(e => {
            return e.clientOwner._id === clientid
        })

       }
    }, [clientid])
    


  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={OnOpenChange}
      className="absolute top-0 "
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Agrega un abono
            </ModalHeader>
            <ModalBody>
              <Select
                label="Selecciona un cliente"
                onChange={(value) => setclientid(value.target.value)}
                className="max-w-xs"
              >
                {clients.map((e, i) => {
                  if(e.clientcreditos.length > 0){
                    return <SelectItem key={e._id}>{e.clientname}</SelectItem>;
                  }
                })}
              </Select>
              <Input
                type="number"
                label="Cantidad del abono"
                onChange={(e) => setabonoamount(e.target.value)}
                min={0}
                
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  handleaddabono();
                  onClose();
                }}
              >
                Crear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default Abonomodal;
