const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Student = require("../models/student");

module.exports.downloadStudentsCSV = async (req, res) => {
  try {
    const csvWriter = createCsvWriter({
      path: "students.csv",
      header: [
        { id: "studentId", title: "Student ID" },
        { id: "studentName", title: "Student Name" },
        { id: "college", title: "College" },
        { id: "batch", title: "Batch" },
        { id: "dsaFinalScore", title: "DSA Final Score" },
        { id: "webDFinalScore", title: "WebD Final Score" },
        { id: "reactFinalScore", title: "React Final Score" },
        { id: "interviewDate", title: "Interview Date" },
        { id: "companyName", title: "Company Name" },
        { id: "interviewStatus", title: "Interview Status" },
      ],
    });

    const students = await Student.find().populate("interviewList");

    const records = [];
    students.forEach((student) => {
      if (student.interviewList.length > 0) {
        student.interviewList.forEach((interview) => {
          const record = {
            studentId: student._id,
            studentName: student.name,
            college: student.college,
            batch: student.batch,
            dsaFinalScore: student.dsaScore,
            webDFinalScore: student.webDScore,
            reactFinalScore: student.reactScore,
            interviewDate: interview.interviewDate,
            companyName: interview.companyName,
            interviewStatus: interview.status,
          };
          records.push(record);
        });
      } else {
        const record = {
          studentId: student._id,
          studentName: student.name,
          college: student.college,
          batch: student.batch,
          dsaFinalScore: student.dsaScore,
          webDFinalScore: student.webDScore,
          reactFinalScore: student.reactScore,
          interviewDate: "Not Assigned",
          companyName: "Not Assigned",
          interviewStatus: "Not Assigned",
        };
        records.push(record);
      }
    });

    await csvWriter.writeRecords(records);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=students.csv");
    res.download("students.csv");
  } catch (error) {
    console.error("Error generating CSV file:", error);
    res.status(500).json({ message: "Error generating CSV file" });
  }
};
