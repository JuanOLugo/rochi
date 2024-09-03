import axios from "axios";

export const getsession = async (token, USER, setUSER, nav, STORE) => {
  if (!window.localStorage.getItem("user")) {
    nav("/");
  } else {
    try {
      const data = await axios.post(
        "http://localhost:3456/api/user/login",
        {},
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      );
      setUSER(data.data.user);
    } catch (error) {
      alert(
        "No se logro iniciar sesion con tu TOKEN, te redireccionaremos a el inicio de sesion"
      );
      nav("/");
    }
  }
};

const verifyStore = async (_) => {};
