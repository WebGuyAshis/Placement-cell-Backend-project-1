const tableBody = document.querySelector('.table-body');
const studentName = document.querySelector('.selected-student-name');
const studentGender = document.querySelector('.student-gender-detail');
const studentDob = document.querySelector('.student-dob-detail');
const studentAge = document.querySelector('.student-age-detail');
const studentCollege = document.querySelector('.student-college-detail');
const studentBatch = document.querySelector('.student-batch-detail');
const studentDsaScore = document.querySelector('.student-dsaScore-detail');
const studentWebDScore = document.querySelector('.student-webDScore-detail');
const studentReactScore = document.querySelector('.student-reactScore-detail');
const studentDetail = document.querySelector('.student-details-container');

const blurContainer = document.createElement('div');
blurContainer.id = 'blur-container';
console.log("Student Scripts Loaded");
document.addEventListener('click', studentUpdateBox);

function studentUpdateBox(e) {
  let fetchClass = e.target.classList.value;
  let fetchId = e.target.id;

  if(fetchClass == 'add-student'){
    openStudentCreateForm();
  }

  if(fetchClass == "bi bi-x-lg"){
    closeStudentCreateForm();
  }
  if(fetchClass == "bi bi-arrow-right-circle-fill"){
    openStudentDetails(e);
  }

  if(fetchClass == 'bi bi-x-lg close-detail' || fetchClass == 'blur'){
    closeStudentDetail();
  }

  console.log("Class:", fetchClass);
  console.log("Id:", fetchId)
  console.log("Event:", e.target);
}
const studentForm = document.querySelector('.student-form-container');
const openStudentCreateForm = () =>{
    studentForm.style.display = 'block';
        document.body.appendChild(blurContainer);
      blurContainer.classList.add('blur');
};

const closeStudentCreateForm = () =>{
    studentForm.style.display = 'none'
    document.body.removeChild(blurContainer);
  blurContainer.classList.remove('blur');
};


const openStudentDetails =(e)=>{
e.preventDefault();
let studentId = e.target.id;

  fetch(`/employee/students-page/:${studentId}`)
  .then(res=>{return res.json()})
  .then(student =>{

      studentName.textContent = student.name;
      studentGender.textContent = student.gender;
      studentDob.textContent = student.dob;
      studentAge.textContent = student.age;
      studentCollege.textContent = student.college;
      studentBatch.textContent = student.batch;
      studentDsaScore.textContent = student.dsaScore;
      studentWebDScore.textContent = student.webDScore;
      studentReactScore.textContent = student.reactScore;

      tableBody.innerHTML = ``;
      console.log("Student:", student);
      student.interviewList.forEach(interviewDetail => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>
           ${interviewDetail.companyName}
        </td>
        <td>
            ${interviewDetail.interviewDate}
        </td>
        <td>
            ${interviewDetail.status}
        </td>
        `;
        tableBody.append(tr);
      });

      const deleteStudent = document.querySelector('.delete-student');
      deleteStudent.setAttribute('href', `/employee/students-page/delete-student/${student._id}`)
    })

  studentDetail.style.display = 'block';
  document.body.appendChild(blurContainer);
      blurContainer.classList.add('blur');
} 

const closeStudentDetail =()=>{
studentDetail.style.display = 'none'
document.body.removeChild(blurContainer);
  blurContainer.classList.remove('blur');
}
