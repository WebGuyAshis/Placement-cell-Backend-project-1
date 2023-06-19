const interviewContainer = document.querySelector(".create-interview");
const updateBox = document.querySelector(".update-interview");
const blurContainer = document.createElement("div");
blurContainer.id = "blur-container";

document.addEventListener("click", handleClicks);
function handleClicks(e) {
  let fetchClass = e.target.classList.value;
  let fetchId = e.target.id;

  console.log("Class:", fetchClass);
  console.log("Id:", fetchId);
  console.log("Event:", e.target);

  if (fetchClass == "add-interview") {
    openCreateInterview();
  } else if (fetchClass == "bi bi-x close-interview") {
    closeCreateInterview();
  } else if (fetchClass == "update-interview-btn") {
    openUpdatebox(fetchId);
  } else if (fetchClass == "bi bi-x close-update") {
    closeUpdateBox();
  }
}

const openCreateInterview = (id) => {
  interviewContainer.style.display = "block";
  document.body.appendChild(blurContainer);
  blurContainer.classList.add("blur");
};

const closeCreateInterview = () => {
  interviewContainer.style.display = "none";
  document.body.removeChild(blurContainer);
  blurContainer.classList.remove("blur");
};

const openUpdatebox = (interviewId) => {
  console.log("Open");

  fetch(`/employee/interviews-page/${interviewId}`)
    .then((res) => {
      return res.json();
    })
    .then((interview) => {
      const interviewDate = interview.interviewDate;
      console.log(interviewDate);

      const formattedDate = new Date(interviewDate).toISOString().split("T")[0];
      updateBox.innerHTML = `
      <i class="bi bi-x close-update"></i>
            <p class="update-student-name"><strong class="label-name">Name: </strong><span>${interview.studentName}</span></p>
            <p class="update-student-company"><strong class="label-name">Company: </strong><span>${interview.companyName}</span></p>

            <form class="update-interview-form" action="/employee/interviews-page/update-interview/${interview._id}" method="post">
                <div class="form-data">
                    <label class="label-name" for="update-date"><strong>Interview Date:</strong> </label>
                <input type="date" name="interviewDate" value="${formattedDate}">
                </div>
                <div class="form-data">
                    <label class="label-name" for="status"><strong>Interview Status:</strong> </label>
                    <select name="status" id="status">
                        <option value="To be decided">To be decided</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Passed">Passed</option>
                        <option value="Failed">Failed</option>
                        <option value="Not Attended">Not Attended</option>
                    </select>
                </div>
                
                <button class="submit-update-btn" type="submit">Update Details</button>
            </form>
      `;
    });

  updateBox.style.display = "block";
  document.body.appendChild(blurContainer);
  blurContainer.classList.add("blur");
};

const closeUpdateBox = () => {
  console.log("Close");
  updateBox.style.display = "none";
  document.body.removeChild(blurContainer);
  blurContainer.classList.remove("blur");
};
