const mongoose = require('mongoose');
const moment = require('moment');
const companySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      addedtime: {
        type: String,
      },
      interviewList: [{
        // type: mongoose.Schema.Types.Mixed,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
      }],
    },
    {
      timestamps: true,
    }
  );
  
  companySchema.pre("save", function (next) {
    this.addedtime = moment(this.time).format("Do MMMM YYYY");
    next();
  });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;