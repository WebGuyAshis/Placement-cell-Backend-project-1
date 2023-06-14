const interviewBox = document.querySelector(".create-interview");
const addCompany = document.querySelector(".add-company-container");
console.log("Script msfsdnk");
const eachList = document.querySelector(".each-student");
const companyDialogueBox = document.querySelector(".company-details-container");

const blurContainer = document.createElement("div");
blurContainer.id = "blur-container";

document.addEventListener("click", studentUpdateBox);

function studentUpdateBox(e) {
  let fetchClass = e.target.classList.value;
  let fetchId = e.target.id;

  if (fetchClass == "bi bi-pencil-square") {
    expandLi();
  }
  if (fetchClass !== "bi bi-pencil-square") {
    closeLi();
  }
  if (fetchClass == "more-company-detail" ||fetchClass == "bi bi-arrow-right") {
    openComapanyDetail(fetchId);
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

  if (fetchClass == "assign-interview") {
    openCreateInterview(fetchId);
  }
  if (fetchClass == "bi bi-x close-interview") {
    closeCreateInterview();
  }

  console.log("Class:", fetchClass);
  console.log("Id:", fetchId);
  console.log("Event:", e.target);
}

const openComapanyDetail = (companyID) => {
  companyDialogueBox.style.display = "flex";
  document.body.appendChild(blurContainer);
  blurContainer.classList.add("blur");
  const assignInterviewBtn = document.querySelector(".assign-interview");
  assignInterviewBtn.setAttribute("id", companyID);
};

const closeComapanyDetail = () => {
  companyDialogueBox.style.display = "none";
  document.body.removeChild(blurContainer);
  blurContainer.classList.remove("blur");
};

const expandLi = () => {
  eachList.style.height = "120px";
};

const closeLi = () => {
  eachList.style.height = "50px";
};


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


const openCreateInterview = (id) => {
  document.querySelector('.company-interviewId').value = id;
  interviewBox.style.display = "block";
};

const closeCreateInterview = () => {
  console.log("Close Box");
  interviewBox.style.display = "none";
};
