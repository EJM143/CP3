document.addEventListener("DOMContentLoaded", () => {
   
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.section-content');
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    }

    // show the home section
    showSection("home");

    // Event listeners for navigation buttons to show sections
    document.getElementById("home-link").addEventListener("click", () => showSection("home"));
    document.getElementById("appointments-link").addEventListener("click", () => showSection("appointments"));
    document.getElementById("medications-link").addEventListener("click", () => showSection("medications"));
    document.getElementById("healthLog-link").addEventListener("click", () => showSection("healthLog"));

    // Function to toggle form visibility
    function toggleForm(formId) {
        const form = document.getElementById(formId);
        form.classList.toggle("hidden");
    }

    // Event listeners for "Add" buttons in the footer to show forms
    document.getElementById("add-appointment-button").addEventListener("click", () => toggleForm("appointment-form"));
    document.getElementById("add-medication-button").addEventListener("click", () => toggleForm("medication-form"));
    document.getElementById("add-health-log-button").addEventListener("click", () => toggleForm("health-log-form"));

    // Event listener for "Sign-In" form to show/hide and handle submission
    document.getElementById("sign-in-link").addEventListener("click", () => toggleForm("sign-in-form"));
    document.querySelector("#sign-in-form").addEventListener("submit", (e) => {
        e.preventDefault(); 
        alert("Sign-In successful!");  
        toggleForm("sign-in-form"); 
    });

});

// Store the data arrays
let appointments = [];
let medications = [];
let healthLogs = [];

// Function to handle appointment form submission
function submitAppointment() {
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;
    const description = document.getElementById("appointment-description").value;
    const newAppointment = { date, time, description };
    
    appointments.push(newAppointment);
    console.log("Appointment Submitted:", newAppointment);
    displayAppointments();
    alert("Appointment saved!");
    toggleForm("appointment-form");
}

// Function to display appointments in a table
function displayAppointments() {
    const appointmentsSection = document.getElementById("appointments");
    
    appointmentsSection.innerHTML = '<h2>Your Appointments</h2>';
    const table = document.createElement("table");
    table.setAttribute("border", "1"); 

    const header = document.createElement("thead");
    header.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
        </tr>
    `;
    table.appendChild(header);

    const tableBody = document.createElement("tbody");
    appointments.forEach(appointment => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${appointment.description}</td>
        `;
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    appointmentsSection.appendChild(table);
}

function submitMedication() {
    const name = document.getElementById("medication-name").value;
    const dosage = document.getElementById("medication-dosage").value;
    const frequency = document.getElementById("medication-frequency").value;
    const startDate = document.getElementById("medication-start-date").value; // added start date for medication

    const newMedication = { name, dosage, frequency, startDate };
    medications.push(newMedication);
    console.log("Medication Submitted:", newMedication);
    displayMedications();
    alert("Medication saved!");
    toggleForm("medication-form");
}

function displayMedications() {
    const medicationsSection = document.getElementById("medications");

    const table = document.createElement("table");
    table.setAttribute("border", "1"); 

    const header = document.createElement("thead");
    header.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Start Date</th>
        </tr>
    `;
    table.appendChild(header);

    const tableBody = document.createElement("tbody");
    medications.forEach(medication => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${medication.name}</td>
            <td>${medication.dosage}</td>
            <td>${medication.frequency}</td>
            <td>${medication.startDate}</td>
        `;
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);

    medicationsSection.innerHTML = '<h2>Your Medications</h2>';
    medicationsSection.appendChild(table);
}

// Function to handle health log form submission
function submitHealthLog() {
    const date = document.getElementById("health-log-date").value; 
    const notes = document.getElementById("health-log-notes").value;

    const newHealthLog = { date, notes };

    healthLogs.push(newHealthLog);
    
    console.log("Health Log Submitted:", newHealthLog);
    displayHealthLogs();
    alert("Health log entry saved!");
    toggleForm("health-log-form");
}

// Function to display health logs in a table
function displayHealthLogs() {
    const healthLogSection = document.getElementById("healthLog");
    healthLogSection.innerHTML = '<h2>Your Health Logs</h2>';
    
    const table = document.createElement("table");
    table.setAttribute("border", "1"); 

    const header = document.createElement("thead");
    header.innerHTML = `
        <tr>
            <th>Date</th> <!-- Added Date column -->
            <th>Notes</th>
        </tr>
    `;
    table.appendChild(header);
    
    const tableBody = document.createElement("tbody");
    healthLogs.forEach(healthLog => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${healthLog.date}</td> <!-- Display date for each health log -->
            <td>${healthLog.notes}</td>
        `;
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    healthLogSection.appendChild(table);
}
