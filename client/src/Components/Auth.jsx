import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Auth() {
  const nav = useNavigate()
  const [Login, setLogin] = useState(true);
  const [mail, setmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [errors, seterrors] = useState(null);
  const { USER, setUSER } = useContext(userContext);
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mail === "" || (!mail && password === "") || !password) {
      seterrors("Llene los campos");
    } else {
      if (Login) {
        const dataToSend = {
          username: mail,
          userpass: password,
        };

        try {
          setisLoading(true);
          const data = await axios.post(
            "http://localhost:3456/api/user/login",
            dataToSend
          );
          setUSER(data.data.user);
          window.localStorage.setItem("user", data.data.token);
          setisLoading(false);

        } catch (error) {
          setisLoading(false);
          seterrors(error.response.data.message);
        }
      } else if (!Login) {
        const dataToSend = {
          username: mail,
          userpass: password,
        };

        try {
          setisLoading(true);
          const data = await axios.post(
            "http://localhost:3456/api/user/register",
            dataToSend
          );
          setUSER(data.data.user);
          window.localStorage.setItem("user", data.data.token);
          setisLoading(false);
        } catch (error) {
          setisLoading(false);
          seterrors(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        seterrors(null);
      }, 2000);
    }
  }, [errors]);

  useEffect(() => {
    if(USER){
      if (USER.userstore.length > 0) {
        nav("/mystores");
      } else nav("/createstore");
    }
  }, [USER])
  

  return (
    <>

      {
        !USER ? <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="mx-4 w-full max-w-md rounded-lg border border-input bg-card p-6 shadow-lg sm:p-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-red-400 " />
            <h1 className="text-2xl font-bold">Rochi</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="ejemplo@correo.com"
                className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={(e) => setmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="text-red-500 text-sm">{errors}</div>
            <button className={`w-full bg-red-400 rounded-md  px-4 py-2 text-sm font-medium text-primary-foregroundtransition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary ${isLoading ? "bg-red-300" : ""}`}>
              {!Login ? "Registrate" : "Inicia sesion"}
            </button>
            <div className="text-center text-sm text-muted-foreground">
              {Login ? "¿No tienes cuenta? " : "¿Tienes cuenta? "}
              <label
                onClick={() => setLogin(!Login)}
                className="font-medium text-primary hover:underline cursor-pointer" 
              >
                {Login ? "Registrate" : "Inicia sesion"}
              </label>
            </div>
          </form>
        </div>
      </div> : ""
      }
    
    </>
  );
}

export default Auth;
