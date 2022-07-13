var BaseDeDatos = require("../dao/BaseDeDatos.js");

let baseDeDatos = new BaseDeDatos();


const add_exam = async (req, res, next) => {

  try {
      const exam = await baseDeDatos.add_exam(req.body.email, req.body.course, req.body.start, req.body.finish, req.body.startMinutesMargin, req.body.finishMinutesMargin)     
      res.send(exam);
  } catch (error) {
      res.status(500).send(error);
  }
}

module.exports = {
  add_exam
};


