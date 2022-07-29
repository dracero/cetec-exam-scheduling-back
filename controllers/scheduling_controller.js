var BaseDeDatos = require("../dao/BaseDeDatos.js");

let baseDeDatos = new BaseDeDatos();


const add_exam = async (req, res, next) => {

  try {
      const exam = await baseDeDatos.add_exam(req.user.email, req.body.course, req.body.start, req.body.finish, req.body.startMinutesMargin, req.body.finishMinutesMargin)     
      res.send(exam);
  } catch (error) {
      res.status(500).send(error);
  }
}

const logout = (req, res, next) => {

  console.log(req.user.email + " ha cerrado sesión.");

  req.logout(function(err) {
    if (err) { return next(err); }
    res.clearCookie("token");
    res.redirect("http://localhost:3000/");
    console.log(`-------> User Logged out`);
  });

}

module.exports = {
  add_exam,
  logout
};
