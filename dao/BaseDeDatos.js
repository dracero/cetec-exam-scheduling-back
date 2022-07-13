var exam = require("../models/exam.js");

class BaseDeDatos {

    constructor(){
        this.examModel = exam;
    }

    async add_exam(email, course, start, finish, startMinutesMargin, finishMinutesMargin) {
        const obj = JSON.stringify({email: email, course: course, start: start, finish: finish, startMinutesMargin: startMinutesMargin, finishMinutesMargin: finishMinutesMargin});
        const exam_structure = new this.examModel(JSON.parse(obj));
        exam_structure.save();
        console.log("Examen nuevo, se agrega a la lista.");
        return exam_structure;
    }
}

module.exports = BaseDeDatos;
