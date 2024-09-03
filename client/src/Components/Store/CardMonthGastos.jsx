import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Progress } from '@nextui-org/react'
import { getGastos } from "../../Controllers/Stores.con";
function CardMonthGastos({store ,allgastos, setallgastos}) {

    const [monthTotalGasto, setmonthTotalGasto] = useState(0);
    const [totalPmonth, settotalPmonth] = useState(0);
    let totalMonth = 0;
    let totalPrevious = 0;
    let fullmonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  
    useEffect(() => {
      const data = getGastos({ storeid: store._id }).then((data) =>
        setallgastos(data)
      );
    }, []);
  
    useEffect(() => {
      if (allgastos) {
        allgastos.gastos.map((e) => {
          if (e.gastodate.split("-")[1] === fullmonth) {
            totalMonth = e.gastoamount + totalMonth;
          }
        });
        let d = parseInt(fullmonth);
        if (d === 1) {
          d = 12;
          d = d.toString().padStart(2, "0");
        } else {
          d = d - 1;
          d = d.toString().padStart(2, "0");
        }
  
        allgastos.gastos.map((e) => {
          if (e.gastodate.split("-")[1] === d) {
            totalPrevious = e.gastoamount + totalPrevious;
          }
        });
        settotalPmonth(totalPrevious);
        setmonthTotalGasto(totalMonth);
      }
    }, [allgastos]);

    


  return (
    <><Card>
    <CardHeader className="pb-2 flex flex-col">
      <p>Gastos mensuales</p>
      <h1 className="text-4xl">
        ${monthTotalGasto.toLocaleString("es-CO")}
      </h1>
    </CardHeader>
    <CardBody>
      <div className="text-xs text-muted-foreground">
        {monthTotalGasto > totalPmonth ? "+" : "-"}
        {(monthTotalGasto / totalPmonth) * 100 === Infinity
          ? "100"
          : (monthTotalGasto / totalPmonth) * 100}{" "}
        % Desde el mes pasado
      </div>
    </CardBody>
    <CardFooter>
      <Progress
        value={monthTotalGasto}
        aria-label="25% increase"
        maxValue={totalPmonth}
        color="danger"
      />
    </CardFooter>
  </Card></>
  )
}

export default CardMonthGastos