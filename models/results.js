const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    interviewDate:{
        type: Date,
    },
    interviewSlot:{
        type: String,
    },
    status:{
        type: String,
    }
})

const Result = mongoose.model('Result', resultsSchema);

module.exports = Result;