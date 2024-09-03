import React, { useContext, useEffect, useState } from "react";
import TableDay from "./Creditos/TableDay";
import ClientTable from "./Creditos/ClientTable";
import { Input, Button, useDisclosure } from "@nextui-org/react";
import CreateClientModal from "./Creditos/CreateClientModal";
import CreateNewCredit from "./Creditos/CreateNewCredit";
import { storecontext } from "../../Context/StoreContexProvider";
import { getAbonos, getCliente, getCredits } from "../../Controllers/Stores.con";
import Abonomodal from "./Creditos/Abonomodal";

function Creditos({
  store,
  recolet,
  setrecolet,
  recoletClients,
  setrecoletClients,
  recoletAbonos,
  setrecoletAbonos,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dis = useDisclosure();
  const des = useDisclosure();
  const date = new Date()
    .toLocaleDateString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  useEffect(() => {
    const datatosendClient = {
      storeid: store._id,
    };
    getCliente(datatosendClient).then((data) =>
      setrecoletClients(data.clients)
    );

    const datatosendCredits = {
      storeid: store._id,
      date: date,
    };
    getCredits(datatosendCredits).then((data) => {
      setrecolet(data.creditos);
    });

    getAbonos({storeid: store._id}).then((data) => {
      setrecoletAbonos(data.abonos);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="grid grid-cols-2  sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1">
          <Button
            size="lg"
            aria-label="add client"
            className="bg-red-500 text-white"
            onPress={onOpen}
          >
            Agregar nuevo cliente
          </Button>
          {recolet.length > 0 ? (
            <Button
              size="lg"
              aria-label="add client"
              className="bg-red-700 text-white"
              onPress={des.onOpen}
            >
              Agrega un abono
            </Button>
          ) : null}
          <Abonomodal
            abonos={recoletAbonos}
            store={store}
            creditos={recolet}
            OnOpenChange={des.onOpenChange}
            isOpen={des.isOpen}
            onClose={des.onClose}
            clients={recoletClients}
            setabono={setrecoletAbonos}
            setcreditos={setrecolet}
          />
          <CreateClientModal
            setClient={setrecoletClients}
            OnOpenChange={onOpenChange}
            isOpen={isOpen}
            onOpen={onOpen}
            store={store}
            Client={recoletClients}
          />
          <Button size="lg" aria-label="Add credit" onPress={dis.onOpen}>
            Agregar nuevo crédito
          </Button>
          <CreateNewCredit
            OnOpenChange={dis.onOpenChange}
            onOpen={dis.onOpen}
            setrecolectcredits={setrecolet}
            store={store}
            isOpen={dis.isOpen}
            clients={recoletClients}
            credits={recolet}
          />
        </div>
        <div className="ml-auto">
          <Input
            size="lg"
            type="search"
            placeholder="Buscar clientes"
            className="w-full sm:w-[200px] lg:w-[300px]"
            aria-label="Buscar clientes"
          />
        </div>
      </div>
      <div className="lg:flex justify-around  sm:grid sm:gap-6">
        <TableDay abonos={recoletAbonos} creditos={recolet} />
        <ClientTable
          clients={recoletClients}
          setclients={setrecoletClients}
          store={store}
        />
      </div>
    </div>
  );
}

export default Creditos;
