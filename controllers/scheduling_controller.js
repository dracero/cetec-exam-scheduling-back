var BaseDeDatos = require("../dao/BaseDeDatos.js");

let baseDeDatos = new BaseDeDatos();

const get_exam_start = async (req, res, next) => {
  try {
    const exam = await baseDeDatos.get_exam_start(req.query.start);
    res.send(exam);
  } catch (error) {
    res.status(500).send(error);
  }
}

const add_exam = async (req, res, next) => {

  try {
      const exam = await baseDeDatos.add_exam(req.user.email, req.query.course, req.query.start, req.query.finish, req.query.startMinutesMargin, req.query.finishMinutesMargin)     
      res.send(exam);
  } catch (error) {
      res.status(500).send(error);
  }
}

const put_exam = async (req, res, next) => {
  try {
    const exam = await baseDeDatos.put_exam(req.params.id, req.user.email, req.body.course, req.body.start, req.body.finish, req.body.startMinutesMargin, req.body.finishMinutesMargin);
    res.send(exam);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.clearCookie("token");
    res.redirect("http://localhost:3000/");
    console.log(`-------> User Logged out`);
  });

}

module.exports = {
  get_exam_start,
  add_exam,
  put_exam,
  logout
};
