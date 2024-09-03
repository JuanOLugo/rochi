const { Router } = require("express");
const store_controllers = require("../Controllers/store.c");
const { auth } = require("../Controllers/user.c");
const rstore = Router();

rstore.post("/create", auth, store_controllers.createstore);
rstore.post("/getall", auth, store_controllers.getallstores);
rstore.get("/getsingle/:storeid", auth, store_controllers.getStore);
rstore.post("/creategasto", auth, store_controllers.createGasto);
rstore.post("/getgasto", auth, store_controllers.getGastos);
rstore.post("/delgasto", auth, store_controllers.delGasto);
rstore.post("/updategasto", auth, store_controllers.updateGasto);
rstore.post("/filtergasto", auth, store_controllers.filterGasto);
rstore.post("/getgastos", auth, store_controllers.getgastos);
rstore.post(
  "/createcliente",
  auth,
  store_controllers.verifyMystore,
  store_controllers.createClient
);

rstore.post(
  "/getclients",
  auth,
  store_controllers.verifyMystore,
  store_controllers.getStoreClients
);

rstore.post(
  "/delclients",
  auth,
  store_controllers.verifyMystore,
  store_controllers.delClient
);

rstore.post(
  "/createcredit",
  auth,
  store_controllers.verifyMystore,
  store_controllers.createCredit
);

rstore.post(
  "/getcredits",
  auth,
  store_controllers.verifyMystore,
  store_controllers.getCredits
);

rstore.post(
  "/addabono",
  auth,
  store_controllers.verifyMystore,
  store_controllers.addAbono
);

rstore.post(
  "/getabonos",
  auth,
  store_controllers.verifyMystore,
  store_controllers.getAbonos
);
module.exports = rstore;
