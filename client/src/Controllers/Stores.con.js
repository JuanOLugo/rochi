import axios from "axios";

const proxy = "http://localhost:3456/api/store/";
const token = window.localStorage.getItem("user");
const apiconfig = { headers: { Authorization: "bearer " + token } };

export const getSingleStore = async (storeid) => {
  const data = await axios.get(proxy + "getsingle/" + storeid, apiconfig);
  return data.data;
};

export const saveGasto = async (datatosend) => {
  const data = await axios.post(proxy + "creategasto", datatosend, apiconfig);
  return data.data;
};

export const getGasto = async (datatosend) => {
  const data = await axios.post(proxy + "getgasto", datatosend, apiconfig);
  return data.data;
};

export const delGasto = async (datatosend) => {
  const data = await axios.post(proxy + "delgasto", datatosend, apiconfig);
  return data.data;
};

export const updateGasto = async (datatosend) => {
  const data = await axios.post(proxy + "updategasto", datatosend, apiconfig);
  return data.data;
};

export const filterGasto = async (datatosend) => {
  const data = await axios.post(proxy + "filtergasto", datatosend, apiconfig);
  return data.data;
};

export const getGastos = async (datatosend) => {
  const data = await axios.post(proxy + "getgastos", datatosend, apiconfig);
  return data.data;
};

export const createCliente = async (datatosend) => {
  const data = await axios.post(proxy + "createcliente", datatosend, apiconfig);
  return data.data;
};


export const getCliente = async (datatosend) => {
  const data = await axios.post(proxy + "getclients", datatosend, apiconfig);
  return data.data;
};

export const delCliente = async (datatosend) => {
  const data = await axios.post(proxy + "delclients", datatosend, apiconfig);
  return data.data;
};

export const createCredit = async (datatosend) => {
  const data = await axios.post(proxy + "createcredit", datatosend, apiconfig);
  return data.data;
};

export const getCredits = async (datatosend) => {
  const data = await axios.post(proxy + "getcredits", datatosend, apiconfig);
  return data.data;
};

export const addAbono = async (datatosend) => {
  const data = await axios.post(proxy + "addabono", datatosend, apiconfig);
  return data.data;
}

export const getAbonos = async (datatosend) => {
  const data = await axios.post(proxy + "getabonos", datatosend, apiconfig);
  return data.data;
}