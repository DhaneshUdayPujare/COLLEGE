const students = [];


// Reference to table body
const studentTableBody = document.querySelector("#studentTable tbody");


// Add student to the table
function addStudentToTable(name, rollNumber, grade) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${rollNumber}</td>
        <td>${grade}</td>
        <td><button class="delete">Delete</button></td>
    `;


    // Add delete functionality
    row.querySelector(".delete").addEventListener("click", () => {
        row.remove();
    });


    studentTableBody.appendChild(row);
}


// Add preloaded students
students.forEach((student) => {
    addStudentToTable(student.name, student.rollNumber, student.grade);
});


// Add new student
document.querySelector("#studentForm").addEventListener("submit", (e) => {
    e.preventDefault();


    const name = document.querySelector("#name").value;
    const rollNumber = document.querySelector("#rollNumber").value;
    const grade = document.querySelector("#grade").value;


    addStudentToTable(name, rollNumber, grade);


    // Clear form
    e.target.reset();
});
