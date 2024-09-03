import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  SelectItem,
  Select,
  Textarea,
} from "@nextui-org/react";
import { createCredit } from "../../../Controllers/Stores.con";
function CreateNewCredit({
  onOpen,
  isOpen,
  OnOpenChange,
  clients,
  store,
  setrecolectcredits,
  credits,
}) {
  const date = new Date()
    .toLocaleDateString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  const [creditamount, setcreditamount] = useState(null);
  const [clientid, setclientid] = useState(null);
  const handleCreateCredit = async () => {
    const datatosend = {
      clientid,
      creditamount,
      date,
      storeid: store._id,
    };

    if (typeof creditamount != Number) {
      datatosend.creditamount = parseInt(datatosend.creditamount);
      const data = await createCredit(datatosend)
      
      //Filtrado para saber si el usuario tiene creditos ese mismo dia

      const filtertoday = credits.filter((e, i) => {
        return e.clientOwner._id === datatosend.clientid
      })

      if(filtertoday.length === 0) {
        setrecolectcredits([...credits, data.credito])
      }else{
        const addNewdata = credits.map((e) => {
          if (e.clientOwner._id === datatosend.clientid) {
            return { ...e, creditoamount: data.credito.creditoamount };
          }
          return e;
        });
      
        setrecolectcredits(addNewdata);
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={OnOpenChange}
        className="absolute top-0"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agrega un cliente
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Selecciona un cliente"
                  onChange={(value) => setclientid(value.target.value)}
                  className="max-w-xs"
                >
                  {clients.map((e, i) => {
                    return <SelectItem key={e._id}>{e.clientname}</SelectItem>;
                  })}
                </Select>
                <Input
                  type="number"
                  label="Cantidad del gasto"
                  onChange={(e) => setcreditamount(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleCreateCredit();
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
    </div>
  );
}

export default CreateNewCredit;
