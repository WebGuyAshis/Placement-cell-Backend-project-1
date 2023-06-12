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
