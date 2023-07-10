const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    studentName:{
        type:String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
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