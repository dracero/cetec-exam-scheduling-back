var exam = require("../models/exam.js");

class BaseDeDatos {

    constructor(){
        this.examModel = exam;
    }

    async add_exam(email, course, start, finish, startMinutesMargin, finishMinutesMargin) {
        
        console.log("Examen nuevo, se agrega a la lista.");
        const obj = JSON.stringify({email: email, course: course, start: start, finish: finish, startMinutesMargin: startMinutesMargin, finishMinutesMargin: finishMinutesMargin});
        const exam_structure = new this.examModel(JSON.parse(obj));
        eaxm_structure.save();
        return exam_structure;
    }
}

module.exports = BaseDeDatos;
