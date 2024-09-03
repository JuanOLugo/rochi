import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
} from "@nextui-org/react";


function CardDailyGastos({ store, allgastos, setallgastos }) {
  const [gastohoy, setgastohoy] = useState(0);
  const [gastoayer, setgastoayer] = useState(0);
  const hoy = new Date()
    .toLocaleDateString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  const ayer = new Date(hoy)
    .toLocaleDateString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  useEffect(() => {
    if (allgastos) {
      let sumHOY = 0;
      allgastos.gastos.map((e) => {
        if (e.gastodate === hoy) {
          sumHOY += e.gastoamount;
        }
      });
      let sumAYER = 0;
      allgastos.gastos.map((e) => {
        if (e.gastodate === ayer) {
          sumAYER += e.gastoamount;
          
        }
      });
      setgastoayer(sumAYER.toLocaleString("es-CO"));
      setgastohoy(sumHOY.toLocaleString("es-CO"));
    }
  }, [allgastos]);

  return (
    <>
      <Card>
        <CardHeader className="pb-2 flex flex-col">
          <p className="">Gasto Ayer/Hoy</p>
          <h1 className="text-4xl">${gastohoy}</h1>
        </CardHeader>
        <CardBody>
          <div className="text-xs text-muted-foreground">
            {gastohoy < gastoayer ? "+" : "-"}
            {(gastohoy / gastoayer) * 100 === Infinity
              ? "100"
              : isNaN((gastohoy / gastoayer) * 100)
              ? "0"
              : (gastohoy / gastoayer) * 100}{" "}
            % Desde ayer
          </div>
        </CardBody>
        <CardFooter>
          <Progress
            value={gastohoy}
            maxValue={gastoayer}
            aria-label="25% increase"
            color="danger"
          />
        </CardFooter>
      </Card>
    </>
  );
}

export default CardDailyGastos;
