var exam = require("../models/exam.js");

class BaseDeDatos {

    constructor(){
        this.examModel = exam;
    }

    async get_exam_by_course_and_date (course, start) {
        return this.examModel.findOne({course: course, start: start})
                            .lean()
                            .then(result => { return result })
                            .catch(e => { throw e });
    }

    async add_exam(email, course, start, finish, startMinutesMargin, finishMinutesMargin) {
        const obj = JSON.stringify({email: email, course: course, start: start, finish: finish, startMinutesMargin: startMinutesMargin, finishMinutesMargin: finishMinutesMargin});
        const exam_structure = new this.examModel(JSON.parse(obj));
        exam_structure.save();
        console.log("Examen nuevo, se agrega a la lista.");
        return exam_structure;
    }

    async put_exam (id, email, course, start, finish, startMinutesMargin, finishMinutesMargin) {
        try {
            const obj = JSON.stringify({email: email, course: course, start: start, finish: finish, startMinutesMargin: startMinutesMargin, finishMinutesMargin: finishMinutesMargin});
            let exam = new this.examModel(JSON.parse(obj));

            await this.examModel.findByIdAndUpdate(id, JSON.parse(obj), {new: true},  function (err, exam) {
                if (err){
                    console.log("Error: " + err.toString());
                }
                else{
                    console.log("Updated id: ", id);
                }
            }).clone();

            return exam;
        }catch(e){
            throw e;
        }
    }
}

module.exports = BaseDeDatos;
