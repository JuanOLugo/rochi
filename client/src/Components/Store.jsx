import React, { useContext, useEffect, useState } from "react";
import { storecontext } from "../Context/StoreContexProvider";
import { userContext } from "../Context/UserContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleStore } from "../Controllers/Stores.con";

//ui
import Navbar from "./Store/Navbar";
import Creditos from "./Store/Creditos";
import Gastos from "./Store/Gastos";
import Dashboard from "./Store/Dashboard";

function Store() {
  const nav = useNavigate();
  const { STORE, setSTORE } = useContext(storecontext);
  const { USER } = useContext(userContext);
  const [mystore, setmystore] = useState(null);
  const { storeid } = useParams();

  //Recolet options

  const [GASTOS, setGASTOS] = useState(null)
  const [CREDITOS, setCREDITOS] = useState([])
  const [CLIENTS, setCLIENTS] = useState(null)
  const [ABONOS, setABONOS] = useState([])



  useEffect(() => {
    if (USER) {
      if (USER.userstore.length > 0) {
        const verifyIdParam = USER.userstore.filter((store) => {
          return store === storeid;
        });

        if (verifyIdParam.length === 0) {
          nav("/");
        } else {
          getSingleStore(
            verifyIdParam[0]
          ).then((data) => {
            if(data == "error"){
              alert("Cargando")
            }else{
              setmystore(data.store)
            }
          });
          
        }
      }
    }

    
  }, [USER]);

  
  const [sections, setsections] = useState({
    dashboard: true,
    gastos: false,
    creditos: false,
  });


  return (
    <>
      {mystore ? (
        <div className="flex ">
          <Navbar store={mystore} setSections={setsections} />

          {sections.dashboard ? <Dashboard store={mystore} gastos={GASTOS} creditos={CREDITOS} /> : null}
          {sections.creditos ? <Creditos store={mystore} recolet={CREDITOS} setrecolet={setCREDITOS}  recoletClients={CLIENTS} setrecoletClients={setCLIENTS} recoletAbonos={ABONOS} setrecoletAbonos={setABONOS}  /> : null}
          {sections.gastos ? <Gastos store={mystore} recolet={GASTOS} setrecolet={setGASTOS} /> : null}
          
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Store;
