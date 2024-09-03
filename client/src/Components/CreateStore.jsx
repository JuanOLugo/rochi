import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStore() {
  const nav = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [storePassword, setStorePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (storePassword && storeName) {
      const dataToSend = {
        storepass: storePassword,
        storename: storeName,
      };

      if (window.localStorage.getItem("user") === "") {
        nav("/");
      } else {
        setIsLoading(true);

        try {
          const data = await axios.post("http://localhost:3456/api/store/create", dataToSend, {
            headers: {
              Authorization: "bearer " + window.localStorage.getItem("user"),
            },
          });
          nav("/mystores")
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Crear Tienda</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="store-name" className="block font-medium mb-2">
              Nombre de la Tienda
            </label>
            <input
              id="store-name"
              type="text"
              placeholder="Ingresa el nombre de la tienda"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="store-password" className="block font-medium mb-2">
              Contraseña de la Tienda
            </label>
            <input
              id="store-password"
              type="password"
              placeholder="Ingresa la contraseña"
              value={storePassword}
              onChange={(e) => setStorePassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Tienda"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStore;
