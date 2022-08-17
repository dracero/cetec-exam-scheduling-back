var BaseDeDatos = require("../dao/BaseDeDatos.js");
var axios = require('axios')

let baseDeDatos = new BaseDeDatos();

const get_exam_by_course_and_date = async (req, res, next) => {
  try {
    const exam = await baseDeDatos.get_exam_by_course_and_date(req.query.course, req.query.start);
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
    edit_dag_run(req.params.id, exam);
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
    res.redirect(process.env.FRONT_URL);
    console.log(`-------> User Logged out`);
  });

}

const delete_dag_run = async (id, headers) => {
  axios
    .delete(process.env.APACHE_URL + '/api/v1/dags/Deepface/dagRuns/' + id, {headers: headers})
    .then(response => {
      if(response.status === 204){
        console.log("DAG run eliminado: ", id);
      }
    })
    .catch(error => {console.log("Error: ", error.response);})
}

const post_dag_run = async (exam, headers) => {
  let date = exam.start
  let data = {
    "dag_run_id": exam.id,
    "logical_date": new Date(date.setMinutes(exam.start.getMinutes() + exam.startMinutesMargin)).toISOString(),
  }
  axios
    .post(process.env.APACHE_URL + '/api/v1/dags/Deepface/dagRuns', data, {headers: headers})
    .then(response => {
      if(response.status === 200){
        console.log("DAG run creado: ", exam.id);
      }
    })
    .catch(error => {console.log("Error: ", error.response);})
}

const edit_dag_run = async (old_id, exam) => {
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic YWlyZmxvdzphaXJmbG93',
  }
  delete_dag_run(old_id, headers)
  post_dag_run(exam, headers)
}

module.exports = {
  get_exam_by_course_and_date,
  add_exam,
  put_exam,
  logout
};
