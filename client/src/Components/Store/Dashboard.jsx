import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Progress,
} from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import CardMonthGastos from "./CardMonthGastos";
import CardDailyGastos from "./CardDailyGastos";

function Dashboard({ store, gastos, creditos }) {
  const [allgastos, setallgastos] = useState(null);

 

  //gastos diarios
 

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumbs>
          <BreadcrumbItem>Mis tiendas</BreadcrumbItem>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
        </Breadcrumbs>
      </header>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start  w-full gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-5">
              <CardHeader className="pb-3">
                <h1 className="font-semibold text-2xl">Metricas clave</h1>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-4">
                  <CardMonthGastos store={store} allgastos={allgastos} setallgastos={setallgastos}/>
                  <CardDailyGastos store={store} allgastos={allgastos} setallgastos={setallgastos}/>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
