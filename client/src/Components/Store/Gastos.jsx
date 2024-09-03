import React, { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaPen } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  delGasto,
  filterGasto,
  getGasto,
  saveGasto,
  updateGasto,
} from "../../Controllers/Stores.con";
import { FaTrashAlt } from "react-icons/fa";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { storecontext } from "../../Context/StoreContexProvider";

function Gastos({ store, recolet, setrecolet }) {
  const [gastoname, setgastoname] = useState("");
  const [gastoamount, setgastoamount] = useState("");
  const [gastodate, setgastodate] = useState(null);
  
  const date = new Date()
    .toLocaleDateString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  const [totalGasto, settotalGasto] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [gastoupdate, setgastoupdate] = useState(null);
  let dateupdate = "";

  const dateref = useRef(null);

  useEffect(() => {
    setgastodate(date);
  }, []);

  const handleSubmit = async () => {
    if (gastoname == "" || gastoamount == "") {
      alert("Rellene los campos");
    } else {
      const dataToSend = {
        gastoname,
        gastodate,
        gastoamount,
        storeid: store._id,
      };
      const data = await saveGasto(dataToSend).then((data) => data);
      setrecolet([...recolet, data.gasto]);
      setgastoamount("");
      setgastoname("");
    }
  };

  const handleUpdate = async () => {
    const data = recolet.findIndex((e) => e._id === gastoupdate._id);
    recolet[data].gastoname = gastoupdate.gastoname;
    recolet[data].gastoamount = gastoupdate.gastoamount;
  };

  useEffect(() => {
    getGasto({ storeid: store._id, date: date }).then((data) =>
      setrecolet(data.gastos)
    );
  }, []);

  useEffect(() => {
    if (recolet) {
      let total = 0;
      recolet.map((e) => {
        total += e.gastoamount;
      });
      settotalGasto(total.toLocaleString("es-CO"));
    }
  });

  const handleDelete = async (e) => {
    const deleteGasto = recolet.filter((h) => {
      return h._id != e._id;
    });
    setrecolet(deleteGasto);

    delGasto({ storeid: store._id, gastoid: e._id });
  };

  const handleFilter = async () => {
    dateupdate = dateref.current.value;
    if (dateupdate) {
      const dataTosend = {
        storeid: store._id,
        gastodate: dateupdate,
      };

      try {
        const data = await filterGasto(dataTosend);
        setrecolet(data.gastos);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gastos</h1>
      <div className="grid grid-cols-1 px-3 py-2 items-center rounded-lg border md:grid-cols-3 shadow-lg gap-4 mb-4">
        <div className="space-y-2">
          <h1>Nombre de gasto</h1>
          <Input
            type="text"
            placeholder="Ingresa el nombre del gasto"
            onChange={(e) => setgastoname(e.target.value)}
            value={gastoname}
            aria-label="Nombre de gasto"
          />
        </div>
        <div className="space-y-2">
          <h1>Cantidad</h1>
          <Input
            type="number"
            value={gastoamount}
            placeholder="Ingresa una cantidad"
            onChange={(e) => setgastoamount(e.target.value)}
            aria-label="Cantidad de gasto"
          />
        </div>

        <div>
          {dateupdate === date ? (
            <Button
              className="mb-4"
              color="danger"
              onClick={handleSubmit}
              aria-label="Añadir gasto"
            >
              Añadir gasto
            </Button>
          ) : dateupdate === "" ? (
            <Button
              className="mb-4"
              color="danger"
              onClick={handleSubmit}
              aria-label="Añadir gasto"
            >
              Añadir gasto
            </Button>
          ) : (
            <Button
              className="mb-4"
              color="primary"
              aria-label="No puedes añadir gastos"
            >
              Inhabilitado
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-xl">
        <h1 className="font-bold">Filtra por fecha</h1>
        <div className="flex">
          <Input
            type="date"
            placeholder="Ingresa una cantidad"
            aria-label="Cantidad de gasto"
            ref={dateref}
          />
          <Button
            className="ml-4"
            color="danger"
            aria-label="Filtra"
            onClick={handleFilter}
          >
            Filtra
          </Button>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-xl">
        <Table aria-label="Tabla de gastos" className=" h-96 sm:h-72">
          <TableHeader className="sticky">
            <TableColumn></TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Cantidad</TableColumn>
            <TableColumn>Fecha</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>

          <TableBody>
            {!store.storegastos ? (
              <TableRow key={1}>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
              </TableRow>
            ) : recolet ? (
              recolet.map((e, i) => {
                let total;
                if (e.gastoamount) {
                  total = e.gastoamount.toLocaleString("es-CO");
                }
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {e.gastodate === date ? (
                        <FaTrashAlt
                          onClick={() => handleDelete(e)}
                          className="text-red-500 cursor-pointer"
                        />
                      ) : null}
                    </TableCell>
                    <TableCell>{e.gastoname}</TableCell>
                    <TableCell>${total}</TableCell>
                    <TableCell>{e.gastodate}</TableCell>
                    <TableCell className="cursor-pointer text-red-500">
                      <button
                        onClick={() => {
                          onOpen();
                          setgastoupdate(e);
                        }}
                      >
                        {e.gastodate === date ? <FaPen /> : null}
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow key={1}>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
                <TableCell>*</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <h1 className="font-bold text-xl mb-2 ml-5 bg-red-500 mt-3 inline-block px-3 py-1 rounded-lg text-white ">
          Total: ${totalGasto ? totalGasto : "0"}
        </h1>
        <Modal
          isOpen={isOpen}
          className="absolute top-0 flex items-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Actualiza tu gasto
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    placeholder="Ingresa el nombre del gasto"
                    onChange={(e) =>
                      setgastoupdate({
                        ...gastoupdate,
                        gastoname: e.target.value,
                      })
                    }
                    value={gastoupdate.gastoname}
                    aria-label="Nombre de gasto"
                    label="Gasto"
                  />
                  <Input
                    type="number"
                    placeholder="Ingresa el nombre del gasto"
                    onChange={(e) =>
                      setgastoupdate({
                        ...gastoupdate,
                        gastoamount: parseInt(e.target.value),
                      })
                    }
                    value={gastoupdate.gastoamount}
                    aria-label="Nombre de gasto"
                    label="Cantidad"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleUpdate();
                      const dataToSend = {
                        gastoid: gastoupdate._id,
                        gastoname: gastoupdate.gastoname,
                        gastoamount: gastoupdate.gastoamount,
                      };
                      updateGasto(dataToSend);
                      onClose();
                    }}
                  >
                    Actualizar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default Gastos;
