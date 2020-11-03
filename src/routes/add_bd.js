// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const router = require("./users.routes");

// //ADD User Manual no Banco

// router.get("/add_bd", (req, res) => {
//   var password = "123654";

//   bcrypt.genSalt(10, (erro, salt) => {
//     bcrypt.hash(password, salt, (erro, hash) => {
//       if (erro) {
//         res.send("Erro ao criptografar a senha!");
//       } else {
//         var senha_cript = hash;
//         new User({
//           name: "José Junior",
//           email: "jjerrorama@gmail.com",
//           password: senha_cript,
//         })
//           .save()
//           .then(() => {
//             console.log("Usuário cadastrado com sucesso!");
//             res.send("Usuário cadastrado com sucesso!");
//           })
//           .catch((err) => {
//             console.log("Erro ao salvar!");
//             res.send("Erro ao salvar!");
//           });
//       }
//     });
//   });
// });

// module.exports = router;