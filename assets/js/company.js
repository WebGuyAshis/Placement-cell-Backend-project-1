console.log("Script msfsdnk");

const blurContainer = document.createElement('div');
blurContainer.id = 'blur-container';

document.addEventListener('click', studentUpdateBox);

function studentUpdateBox(e) {
  let fetchClass = e.target.classList.value;
  let fetchId = e.target.id;

  if(fetchClass == 'bi bi-pencil-square'){
    expandLi();
  }
  if(fetchClass !== 'bi bi-pencil-square'){
    closeLi();
  }
  if(fetchClass == "more-company-detail" || fetchClass == 'bi bi-arrow-right'){
    openComapanyDetail();
  }
  if(fetchClass == 'bi bi-x-lg'){
    closeComapanyDetail();
  }

  console.log("Class:", fetchClass);
  console.log("Id:", fetchId)
  console.log("Event:", e.target);
}
const eachList = document.querySelector('.each-student')
const companyDialogueBox = document.querySelector('.company-details-container');

const openComapanyDetail = ()=>{
    companyDialogueBox.style.display = 'flex';
    document.body.appendChild(blurContainer);
  blurContainer.classList.add('blur');
}

const closeComapanyDetail = ()=>{
    companyDialogueBox.style.display = 'none';
    document.body.removeChild(blurContainer);
  blurContainer.classList.remove('blur');
}


const expandLi = ()=>{
    eachList.style.height = "120px"
}

const closeLi = () =>{
    eachList.style.height = "50px"
}

