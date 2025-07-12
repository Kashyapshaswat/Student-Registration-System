let studentData = JSON.parse(localStorage.getItem("students")) || [];

//References for inputs
const nameInput = document.getElementById("name");
const idInput = document.getElementById("ID");
const emailInput = document.getElementById("EmailId");
const contactInput = document.getElementById("Rollno");
const addButton = document.querySelector(".Add");
const entriesDiv = document.querySelector(".entry-container");

//Function to store data in local storage.
function renderEntries() {
    // clearing UI
    entriesDiv.innerHTML = ""; 
    //Creating divs and assigning entries to them.
    studentData.forEach((student, index) => {
        //Created entry-row for all the entries to be stored in.
        const entriesRow = document.createElement("div");
        entriesRow.classList.add("entry-row");

        const stdname = document.createElement("div");
        stdname.textContent = student.name;

        const stdid = document.createElement("div");
        stdid.textContent = student.id;

        const stdemail = document.createElement("div");
        stdemail.textContent = student.email;

        const stdcontact = document.createElement("div");
        stdcontact.textContent = student.contact;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => {
            nameInput.value = student.name;
            idInput.value = student.id;
            emailInput.value = student.email;
            contactInput.value = student.contact;

            //For Removing Edited students and update local storage
            studentData.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(studentData));
            // Re-rendering entries after Edit
            renderEntries(); 
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            //For removing deleted students and updating local storage
            studentData.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(studentData));
            // Re-rendering entries after delete
            renderEntries(); 
        });

        const controlGroup = document.createElement("div");
        controlGroup.appendChild(editBtn);
        controlGroup.appendChild(deleteBtn);

        entriesRow.appendChild(stdname);
        entriesRow.appendChild(stdid);
        entriesRow.appendChild(stdemail);
        entriesRow.appendChild(stdcontact);
        entriesRow.appendChild(controlGroup);

        entriesDiv.appendChild(entriesRow);
    });
}

    //Checking for empty entries
addButton.addEventListener("click", ()=>{
    if(!nameInput.value || !idInput.value || !emailInput.value || !contactInput.value){
        alert("Please fill in all the fields");
        return;
    }
    //Removing spaces from the inputs for input validation    
    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();
    // Validation regex(Learned and used Regex for a strict checking of the inputs)
    const studentnameRegex = /^[a-zA-Z\s]+$/;
    const studentidRegex = /^\d+$/;
    const studentcontactRegex = /^\d{10}$/;
    const studentemailRegex = /^\S+@\S+\.\S+$/;

    if (!studentnameRegex.test(name)) {
        alert("Name should contain only letters and spaces.");
        return;
    }

    if (!studentidRegex.test(id)) {
        alert("Student ID should contain only numbers.");
        return;
    }

    if (!studentcontactRegex.test(contact)) {
        alert("Contact number should be exactly 10 digits.");
        return;
    }

    if (!studentemailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    //Saved new entries to studentData and updated localStorage
    studentData.push({ name, id, email, contact });
    localStorage.setItem("students", JSON.stringify(studentData));
    renderEntries();


//Clearing form inputs
    nameInput.value = "";
    idInput.value = "";
    emailInput.value = "";
    contactInput.value = ""; 


});
//Render entries on initial page load
renderEntries();
