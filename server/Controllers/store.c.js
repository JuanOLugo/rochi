const storemodel = require("../DB/MODELs/store");
const bcrypt = require("bcrypt");
const usermodel = require("../DB/MODELs/user");
const gastomodel = require("../DB/MODELs/gastos");
const clientmodel = require("../DB/MODELs/Client");
const creditomodel = require("../DB/MODELs/creditos");
const abonomodel = require("../DB/MODELs/Abonos");

const verifyMystore = async (req, res, next) => {
  const { storeid } = req.body;
  const findStore = await storemodel.findById(storeid);
  if (findStore) {
    req.store = findStore;
    return next();
  }
  return res.status(400).send({ message: "No existe tienda" });
};

const createstore = async (req, res) => {
  const { storename, storepass } = req.body;

  if (!req.user || Object.keys(req.user).length === 0) {
    res.status(404).send({ message: "ERROR FATAL" });
  } else if (storename && storepass) {
    if (req.user.userstore.lenght > 3)
      return res.status(400).send({ message: "Ya tienes muchas tiendas" });

    const hashPass = await bcrypt.hash(storepass, 10);

    if (hashPass) {
      const newStore = new storemodel({
        storename,
        storepass: hashPass,
        storeowner: req.user.id,
      });

      const newStoreCreated = await newStore.save();

      const user = await usermodel.findById(req.user.id);

      user.userstore.push(newStoreCreated.id);

      await user.save();

      res.status(200).send({ message: "Tienda creada satisfactoriamente" });
    } else return res.status(404).send({ message: "Error al crear la tienda" });
  } else {
    res.status(400).send({ message: "ERROR FATAL: COMPLETE LOS CAMPOS" });
  }
};

const getallstores = async (req, res) => {
  const { id } = req.user;

  const findStores = await storemodel
    .find({ storeowner: id })
    .populate("storeowner");

  res.status(200).send({ stores: findStores });
};

const getStore = async (req, res) => {
  const { storeid } = req.params;

  const findstore = await storemodel.findById(storeid);

  res.status(200).send({ store: findstore });
};

const createGasto = async (req, res) => {
  const { gastoname, gastoamount, gastodate, storeid } = req.body;

  const findstore = await storemodel.findById(storeid);

  if (findstore) {
    const newGasto = new gastomodel({
      gastoname,
      gastoamount,
      gastodate,
      storeowner: findstore.id,
    });

    const savedNewGasto = await newGasto.save();

    findstore.storegastos.push(savedNewGasto.id);

    await findstore.save();

    res.status(200).send({ gasto: savedNewGasto });
  }
};

const getGastos = async (req, res) => {
  const { storeid, date } = req.body;

  const findGastos = await gastomodel.find({ storeowner: storeid });

  const filterGastoByDate = findGastos.filter((gasto) => {
    return gasto.gastodate === date;
  });

  res.status(200).send({ gastos: filterGastoByDate });
};

const delGasto = async (req, res) => {
  const { storeid, gastoid } = req.body;

  await gastomodel.findByIdAndDelete(gastoid);

  const findStore = await storemodel.findById(storeid);

  findStore.storegastos = findStore.storegastos.filter((e) => {
    return e != gastoid;
  });

  findStore.save();

  res.status(200).send({ message: "Se elimino correctamente" });
};

const updateGasto = async (req, res) => {
  const { gastoid, gastoname, gastoamount } = req.body;

  await gastomodel.findByIdAndUpdate(gastoid, {
    gastoname,
    gastoamount,
  });

  res.status(200).send({ message: "Se actualizo correctamente correctamente" });
};

const filterGasto = async (req, res) => {
  const { storeid, gastodate } = req.body;

  const gastos = await gastomodel.find({ storeowner: storeid });

  const dataFilter = gastos.filter((e) => e.gastodate === gastodate);

  res.status(200).send({ gastos: dataFilter });
};

const getgastos = async (req, res) => {
  const { storeid } = req.body;

  const gastos = await gastomodel.find({ storeowner: storeid });

  res.status(200).send({ gastos: gastos });
};

//Creditos

const createClient = async (req, res) => {
  const { clientname, date } = req.body;

  const newClient = await new clientmodel({
    clientname,
    clientdate: date,
    storeowner: req.store._id,
  });

  const mystore = await storemodel.findById(req.store._id);

  const newClientSave = await newClient.save();

  mystore.storeclients.push(newClientSave._id);

  await mystore.save();

  res.status(200).send({ message: "Cliente guardado", client: newClientSave });
};

const delClient = async (req, res) => {
  const { _id } = req.store;
  const { clientid } = req.body;
  const findClients = await clientmodel.findOneAndDelete(clientid);
  const findStore = await storemodel.findById(_id);
  const delCliente = findStore.storeclients.filter((e) => {
    return e != clientid;
  });

  findStore.storeclients = delCliente;
  findStore.save();
  if (findClients)
    return res.status(200).send({ messgae: "Eliminado correctamente" });
  return res.status(400).send({ message: "No se encontro nada" });
};

const getStoreClients = async (req, res) => {
  const { _id } = req.store;
  const findClients = await clientmodel.find({ storeowner: _id });

  if (findClients) return res.status(200).send({ clients: findClients });
  return res.status(400).send({ message: "No se encontro nada" });
};

const createCredit = async (req, res) => {
  const { _id } = req.store;
  const { clientid, creditamount, date } = req.body;

  const findclient = await clientmodel.findById(clientid);

  if (findclient) {
    const findcredit = await creditomodel.findOne({
      clientOwner: findclient._id,
    });

    if (findcredit) {
      findcredit.creditoamount =
        findcredit.creditoamount + parseInt(creditamount);
      const newCreditSave = await findcredit.save();

      const CreditToSend = await newCreditSave.populate("clientOwner");
      res.status(200).send({ credito: CreditToSend });
    } else {
      const newCredit = new creditomodel({
        clientOwner: clientid,
        creditoamount: creditamount,
        creditodate: date,
        storeowner: _id,
      });

      const newCreditSave = await (
        await newCredit.save()
      ).populate("clientOwner");
      findclient.clientcreditos.push(newCreditSave._id);

      await findclient.save();

      res.status(200).send({ credito: newCreditSave });
    }
  } else
    res
      .status(400)
      .send({ message: "Error, no se pudo crear el neuvo credito" });
};

const getCredits = async (req, res) => {
  const { _id } = req.store;
  const { date } = req.body;

  const findstore = await storemodel.findById(_id);

  if (findstore) {
    const findCredits = await creditomodel
      .find({ storeowner: findstore._id })
      .populate("clientOwner");
    res.status(200).send({ creditos: findCredits });
  } else
    res.status(400).send({ message: "Error, no se encontro ninguna tienda" });
};

const addAbono = async (req, res) => {
  const { _id } = req.store;

  const { clientid, abonoamount, date , credito} = req.body;

  const findStore = await storemodel.findById(_id);

  if (findStore) {
    const findmyclient = await clientmodel.findById(clientid);
    const findmycredit = await creditomodel.findById(credito);
    if (findmyclient && findmycredit) {
      const newAbono = new abonomodel({
        abonoamount,
        abonodate: date,
        clientOwner: findmyclient._id,
        creditAbono: findmycredit._id,
        storeowner: findStore.id,
      });

      const newCreatedAbono = await newAbono.save();
      const AbonoTosend = await newCreatedAbono.populate("clientOwner");

      //Añadir el abono al cliente
      findmyclient.clientabonos.push(newCreatedAbono);
      await findmyclient.save();

      //Restamos el valor del abono al credito
      if(findmycredit.creditoamount - parseInt(abonoamount) <= 0){
        const data = await creditomodel.findByIdAndDelete(findmycredit._id)
        const delCreditUser = findmyclient.clientcreditos.filter(e => {
          return data._id != e._id
        })
        findmyclient.clientcreditos = delCreditUser
        await findmyclient.save()
        return res.status(200).send({iddel: findmycredit._id, abono: AbonoTosend})
      }
      findmycredit.creditoamount = findmycredit.creditoamount - parseInt(abonoamount)
      const creditEdit = await findmycredit.save();
      const CreditToSend = await creditEdit.populate("clientOwner");

      res.status(200).send({ credito: CreditToSend, abono: AbonoTosend });
    } else {
      res.status(200).send({ message: "ERROR" });
    }
  }
};

const getAbonos = async (req, res) => {
  const { _id } = req.store;

  const findAbonos = await abonomodel.find({storeowner: _id}).populate("clientOwner")
  
  res.status(200).send({abonos: findAbonos})

};

module.exports = {
  getAbonos,
  createstore,
  getallstores,
  getStore,
  createGasto,
  getGastos,
  delGasto,
  updateGasto,
  filterGasto,
  getgastos,
  createClient,
  getStoreClients,
  verifyMystore,
  delClient,
  createCredit,
  getCredits,
  addAbono
};
