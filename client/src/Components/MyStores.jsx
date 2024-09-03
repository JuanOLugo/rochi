import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { storecontext } from "../Context/StoreContexProvider";

function MyStores() {
  const [stores, setstores] = useState([]);
  const { USER } = useContext(userContext);
  const { STORE, setSTORE } = useContext(storecontext);
  const getStores = async () => {
    const token = window.localStorage.getItem("user");
    if (token) {
      try {
        const data = await axios.post(
          "http://localhost:3456/api/store/getall",
          { data: 1 },
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        setSTORE(data.data.stores);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getStores();
  }, [USER]);

  return (
    <>
      {!STORE ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white rounded-lg  shadow-md p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full border-red-500 h-12 w-12 border-b-2 " />
            <h2 className="text-2xl font-bold mt-4">Cargando...</h2>
            <p className="text-gray-500 mt-2">Por favor, espera un momento.</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold ">Tiendas</h1>
            <div className="flex items-center space-x-4">
              <a
                href="/createstore"
                className="inline-flex bg-red-600 items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary {"
              >
                Crear nueva tienda
              </a>
              <button onClick={() => {
                window.localStorage.removeItem("user")
                window.location.reload()
              }} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Logout
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {STORE.map((store, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 capitalize">
                    {store.storename}
                  </h2>
                  <p className="text-gray-500 mb-4  ">
                    Propietario: {store.storeowner.username}
                  </p>
                  <button className="inline-flex items-center bg-red-500 justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <a href={"/mystores/"+store._id }>
                    Ir a la tienda</a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MyStores;
