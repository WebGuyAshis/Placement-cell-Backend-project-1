document.addEventListener("click", handleClicks);

function handleClicks(e) {
  let fetchClass = e.target.classList.value;
  let fetchId = e.target.id;

  console.log("Class:", fetchClass);
  console.log("Id:", fetchId);
  console.log("Event:", e.target);

  if(fetchClass == 'add-interview'){
    openCreateInterview();
  }else if(fetchClass == 'bi bi-x close-interview'){
    closeCreateInterview();
  }
}

const interviewContainer = document.querySelector('.create-interview');

const openCreateInterview = (id) => {
    interviewContainer.style.display = "block";
  };
  
  const closeCreateInterview = () => {
    interviewContainer.style.display = "none";
  };