const jwt = require("jsonwebtoken");
const usermodel = require("../DB/MODELs/user");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");
const secretkey = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { username, userpass } = req.body;
  if (username && userpass) {
    const findUser = await usermodel.findOne({ username });

    if (findUser) {
      const verifyPass = await bcrypt.compare(userpass, findUser.userpass);

      if (verifyPass) {
        const userToken = await jwt.sign(findUser.id, secretkey);
        res.status(200).send({ user: findUser, token: userToken });
      } else
        return res.status(400).send({ message: "Credenciales incorrectas" });
    } else
      return res
        .status(400)
        .send({ message: "El usuario al que buscas no existe" });
  }
};

const register = async (req, res) => {
  const { username, userpass } = req.body;

  //Verificamos existensia de usuario
  const verify_user = await usermodel.findOne({ username });

  //Mensaje de error en caso de que exista
  if (verify_user)
    return res.status(400).send({ message: "Error, este usuario ya existe" });

  const hashPass = await bcrypt.hash(userpass, 10);


  //Creamos un nuevo usuario
  const newUser = new usermodel({
    username,
    userpass: hashPass,
  });

  //Guardamos el usuario
  const newUserCreated = await newUser.save();

  const createToken = jwt.sign(newUserCreated.id, secretkey);

  //Enviamos el usuario al cliente
  res.status(200).send({
    user: newUserCreated,
    token: createToken,
  });
};

const auth = async (req, res, next) => {
  const auth = req.get("Authorization");

  if (auth) {
    const token = auth.split(" ")[1];

    const decifreToken = await jwt.verify(token, secretkey);
    if (decifreToken) {
      const findUser = await usermodel.findById(decifreToken);
      if (Object.keys(req.body).length === 0) {
        if (Object.keys(req.params).length === 0) {
          res.status(200).send({ user: findUser, token: token });
        } else {
          req.user = findUser;
          next();
        }
      } else {
        req.user = findUser;
        next();
      }
    } else next();
  } else next();
};

module.exports = { login, register, auth };
