import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import axios from "axios";
import { getsession } from "./Controllers/GetSession";
import { userContext } from "./Context/UserContextProvider";
import { useNavigate } from "react-router-dom"
import CreateStore from "./Components/CreateStore";
import MyStores from "./Components/MyStores";
import { storecontext } from "./Context/StoreContexProvider";
import Store from "./Components/Store";


function App() {
  const { USER, setUSER } = useContext(userContext);
  const { STORE, setSTORE } = useContext(storecontext);
  const token = window.localStorage.getItem("user");
  const nav = useNavigate()

  

  useEffect(() => {
    if(!USER){
      getsession(token, USER, setUSER, nav, STORE);
    }
  }, []);

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/createstore" element={<CreateStore/>} />
          <Route path="/mystores" element={<MyStores/>}/>
          <Route path="/mystores/:storeid" element={<Store/>}/>
        </Routes>
      
    </>
  );
}

export default App;
