const interviewBox = document.querySelector(".create-interview");
const addCompany = document.querySelector(".add-company-container");
const eachList = document.querySelector(".each-student");
const companyDialogueBox = document.querySelector(".company-details-container");

const blurContainer = document.createElement("div");
blurContainer.id = "blur-container";

document.addEventListener("click", studentUpdateBox);

function studentUpdateBox(e) {
  let fetchClass = e.target.classList.value;
  let fetchId = e.target.id;

  console.log("Class:", fetchClass);
  console.log("Id:", fetchId);

  // if (fetchClass == "bi bi-pencil-square") {
  //   expandLi();
  // }
  // if (fetchClass !== "bi bi-pencil-square") {
  //   closeLi();
  // }
  if (fetchClass == "more-company-detail" ||fetchClass == "bi bi-arrow-right") {
    openComapanyDetail(e);
  }
  if (fetchClass == "bi bi-x-lg") {
    closeComapanyDetail();
  }
  if (fetchClass == "add-company") {
    openAddCompany(fetchId);
  }
  if (fetchClass == "bi bi-x") {
    closeAddCompany();
  }

}

const openComapanyDetail = (e) => {

  companyDialogueBox.style.display = "flex";
  document.body.appendChild(blurContainer);
  blurContainer.classList.add("blur");
  
  e.preventDefault();
  const companyId = e.target.id;
  console.log(companyId);

  fetch(`/employee/companies-page/:${companyId}`)
    .then(res=>{return res.json()})
    .then(company=>{

      const list = document.querySelector('.students-list');
      const companyName = document.querySelector('.company-details-name');
      companyName.textContent = `${company.name}`;
      list.innerHTML= '';
      company.interviewList.forEach(interviewDetail=>{
        const li = document.createElement('li');
        li.setAttribute('class', 'each-student')
        li.innerHTML = `<div class="student-li">
        <div class="student-name">
          <h4>${interviewDetail.studentName}</h4>
        </div>
        <span class="status"> ${interviewDetail.interviewDate} </span>
        <span class="status"> ${interviewDetail.status} </span>
        <div class="edit-icons">
          <i class="bi bi-pencil-square"></i>
          <i class="bi bi-trash3"></i>
        </div>
      </div>`
      list.append(li);
      })

      
    })
  }
const closeComapanyDetail = () => {
  companyDialogueBox.style.display = "none";
  document.body.removeChild(blurContainer);
  blurContainer.classList.remove("blur");
};

// const expandLi = () => {
//   eachList.style.height = "120px";
// };

// const closeLi = () => {
//   eachList.style.height = "50px";
// };


const openAddCompany = () => {
  console.log("Add Company");
  addCompany.style.display = "flex";
  document.body.appendChild(blurContainer);
  blurContainer.classList.add("blur");
};

const closeAddCompany = () => {
  addCompany.style.display = "none";
  document.body.removeChild(blurContainer);
  blurContainer.classList.remove("blur");
};


// const openCreateInterview = (id) => {
//   document.querySelector('.company-interviewId').value = id;
//   interviewBox.style.display = "block";
// };

// const closeCreateInterview = () => {
//   console.log("Close Box");
//   interviewBox.style.display = "none";
// };
