import React, { useEffect, useState } from "react";
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
function TableDay({abonos, creditos}) {
  const [ABONOCREDITO, setABONOCREDITO] = useState([]);
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
    if(abonos && creditos){
      setABONOCREDITO([...abonos, ...creditos])
    }
  }, [creditos, abonos])
  
  useEffect(() => {
    console.log(ABONOCREDITO)
  }, [ABONOCREDITO])
  

  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold">Todos los creditos y abonos de hoy</h1>
        </CardHeader>
        <CardBody>
          <Table aria-label="Tabla" className="overflow-y-visible h-60">
            <TableHeader>
              <TableColumn>Cliente</TableColumn>
              <TableColumn>Crédito</TableColumn>
              <TableColumn>Abono</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Fecha</TableColumn>
            </TableHeader>
            <TableBody>
              {ABONOCREDITO.length === 0 ? (
                null
              ) : (
                ABONOCREDITO.map((e, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{e.clientOwner.clientname}</TableCell>
                      <TableCell className="text-center font-bold ">{e.creditoamount ? "x" : " - "}</TableCell>
                      <TableCell className="text-center font-bold ">{e.abonoamount  ? "x" : " - "}</TableCell>
                      <TableCell>${e.creditoamount ? e.creditoamount.toLocaleString("es-co") : e.abonoamount.toLocaleString("es-co") }</TableCell>
                      <TableCell>{e.creditodate || e.abonodate}</TableCell>
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

export default TableDay;
