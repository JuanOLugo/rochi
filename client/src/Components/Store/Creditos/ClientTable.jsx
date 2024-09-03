import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FaTrashAlt } from "react-icons/fa";

import { delCliente } from "../../../Controllers/Stores.con";

function ClientTable({ clients, setclients, store }) {
  const handleDelete = async (e) => {
    try {
      const data = await delCliente({ storeid: store._id, clientid: e._id });
    } catch (e) {
      console.log(e);
    }

    const data = clients.filter((h) => {
      return h._id != e._id;
    });
    setclients(data);
  };

  return (
    <div>
      <Card className=" md:w-auto lg:w-96">
        <CardHeader>
          <h1 className="text-xl font-bold">Clientes</h1>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Tabla clientes"
            className="overflow-y-visible h-60"
          >
            <TableHeader>
              <TableColumn>
                <FaTrashAlt />
              </TableColumn>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Creditos</TableColumn>
            </TableHeader>
            <TableBody>
              {!clients ? (
                <TableRow>
                  <TableCell>
                    <FaTrashAlt />
                  </TableCell>
                  <TableCell>a</TableCell>
                  <TableCell>a</TableCell>
                </TableRow>
              ) : (
                clients.map((e, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        {e.clientcreditos.length > 0 ? null : (
                          <FaTrashAlt
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleDelete(e)}
                          />
                        )}
                      </TableCell>
                      <TableCell>{e.clientname}</TableCell>
                      <TableCell>{e.clientcreditos.length}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ClientTable;
