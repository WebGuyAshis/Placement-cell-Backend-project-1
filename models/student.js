const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true,
    },
    dob:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    college:{
        type:String,
        required: true
    },
    batch:{
        type:Number,
        required: true
    },
    dsaScore:{
        type: Number,
        required:true
    },
    webDScore:{
        type: Number,
        required: true
    },
    reactScore:{
        type:Number,
        required: true
    }, 
    interviewList: [{
        // type: mongoose.Schema.Types.Mixed,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
      }],
},
{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;