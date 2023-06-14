const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    studentName:{
        type:String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    companyName:{
        type:String
    },
    interviewDate:{
        type: String,
    },
    status:{
        type: String,
    }
})

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;